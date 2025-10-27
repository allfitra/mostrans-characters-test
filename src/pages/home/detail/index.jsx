import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../../components/Layouts/MainLayout";
import { useQuery } from "@apollo/client/react";

const GET_CHARACTER_DETAIL = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

const CharacterDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id },
  });

  if (loading)
    return (
      <MainLayout title="Character Detail">
        <div className="flex justify-center py-10">
          <div className="animate-pulse space-y-4 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto" />
            <div className="w-40 h-4 bg-gray-300 mx-auto rounded" />
            <div className="w-56 h-3 bg-gray-200 mx-auto rounded" />
          </div>
        </div>
      </MainLayout>
    );

  if (error)
    return (
      <MainLayout title="Character Detail">
        <p className="p-6 text-center text-red-500 font-semibold">
          Error fetching data 😢
        </p>
      </MainLayout>
    );

  const c = data.character;

  return (
    <MainLayout title="Character Detail">
      <div className="flex justify-center py-10">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-[90%] sm:w-[380px] transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative bg-gradient-to-r from-[#014d30] via-[#01663f] to-[#028a56] h-36 flex justify-center items-end pb-10">
            <img
              src={c.image}
              alt={c.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md absolute bottom-[-35px]"
            />
          </div>

          {/* Detail Section */}
          <div className="pt-14 pb-6 px-6 text-center">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${getStatusColorClass(
                c.status
              )}`}
            >
              {c.status.toUpperCase()}
            </span>

            <h2 className="text-2xl font-bold text-gray-800 mb-1">{c.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{c.species}</p>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
              <DescRow label="Gender" value={c.gender} />
              <DescRow label="Origin" value={c.origin.name} />
              <DescRow label="Location" value={c.location.name} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CharacterDetail;

const DescRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-700">
    <span className="font-semibold text-gray-500">{label}:</span>
    <span className="truncate max-w-[150px] text-gray-800">{value}</span>
  </div>
);

const getStatusColorClass = (status) => {
  if (status === "Alive") return "bg-green-100 text-green-700";
  if (status === "Dead") return "bg-red-100 text-red-700";
  return "bg-gray-200 text-gray-700";
};
