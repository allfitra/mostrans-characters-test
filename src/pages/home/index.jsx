import React, { useEffect } from "react";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { useQuery } from "@apollo/client/react";
import GET_CHARACTERS from "../../apollo/queries/characters";
import CardList from "./components/CardList";
import SkeletonGrid from "./components/SkeletonGrid";

const HomePage = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom && data?.characters.info.next) {
        fetchMore({
          variables: { page: data.characters.info.next },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              characters: {
                __typename: prev.characters.__typename,
                info: fetchMoreResult.characters.info,
                results: [
                  ...prev.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            };
          },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, fetchMore]);

  return (
    <MainLayout title="Home">
      <div className="flex flex-col items-center max-w-6xl mx-auto">
        <div className="w-full lg:w-[80%] h-[290px] rounded-b-2xl bg-gradient-to-r from-[#014d30] via-[#01663f] to-[#028a56] shadow-xl text-white p-6 flex items-center justify-between"></div>

        <div className="flex flex-col items-center -mt-[190px] w-full">
          <h1 className="text-4xl font-bold text-white mb-7">
            Characters List
          </h1>
          {error ? (
            <p className="text-red-500 font-bold text-xl">
              Error loading data.
            </p>
          ) : (
            <>
              <CardList dataList={data?.characters?.results || []} />
              {loading && <SkeletonGrid />}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
