import React, { useEffect } from "react";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        image
        species
        gender
      }
    }
  }
`;

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

const CardList = ({ dataList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {dataList.map((char) => (
        <Link
          key={char.id}
          to={`/character/${char.id}`}
          className="max-w-[180px] rounded-xl shadow-lg cursor-pointer bg-white hover:shadow-2xl transition-shadow duration-300 px-6 py-4"
        >
          <div className="flex justify-center items-center">
            <img className="w-34 rounded-md" src={char.image} alt={char.name} />
          </div>
          <div className="mt-3">
            <p className={`text-[12px] ${getGenderColorClass(char.gender)}`}>
              {char.gender || "Unknown"}
            </p>
            <div className="font-semibold text-[14px] text-gray-800 line-clamp-2 leading-snug min-h-[40px]">
              {char.name}
            </div>
            <div className="flex justify-end">
              <span className="inline-block bg-[#014d30] rounded-full px-3 py-1 text-[10px] font-semibold text-white">
                {char.species}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const SkeletonGrid = () => {
  const skeletons = Array(4).fill(0);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {skeletons.map((_, i) => (
        <div
          key={i}
          className="max-w-[180px] rounded-xl shadow-lg bg-white px-6 py-4 animate-pulse"
        >
          <div className="flex justify-center items-center">
            <div className="w-28 h-40 bg-gray-200 rounded-md" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="flex flex-wrap mt-3 gap-2">
              <div className="w-10 h-4 bg-gray-200 rounded-full" />
              <div className="w-10 h-4 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getGenderColorClass = (gender) => {
  if (gender === "Male") return "text-blue-700";
  if (gender === "Female") return "text-pink-700";
  return "text-gray-700";
};
