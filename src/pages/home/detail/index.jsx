import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../../components/Layouts/MainLayout";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

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

  const [locationName, setLocationName] = useState("");
  const [assignedLocation, setAssignedLocation] = useState(null);

  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem("locations") || "[]");
    const found = locations.find((loc) =>
      loc.characters.some((char) => char.id === id)
    );
    if (found) setAssignedLocation(found.name);
  }, [id]);

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

  const char = data.character;

  const handleAssign = () => {
    const locations = JSON.parse(localStorage.getItem("locations") || "[]");
    const isDuplicate = locations.some(
      (loc) => loc.name.toLowerCase() === locationName.toLowerCase()
    );
    if (!locationName.trim()) return alert("Lokasi wajib diisi!");
    if (isDuplicate) {
      const updated = locations.map((loc) => {
        if (loc.name.toLowerCase() === locationName.toLowerCase()) {
          const withoutChar = locations.map((l) => ({
            ...l,
            characters: l.characters.filter((char) => char.id !== id),
          }));

          loc.characters.push({
            id: char.id,
            name: char.name,
            image: char.image,
          });
          localStorage.setItem("locations", JSON.stringify(withoutChar));
          return loc;
        }
        return loc;
      });
      localStorage.setItem("locations", JSON.stringify(updated));
    } else {
      const newLocation = {
        name: locationName,
        characters: [
          {
            id: char.id,
            name: char.name,
            image: char.image,
          },
        ],
      };
      const cleaned = locations.map((loc) => ({
        ...loc,
        characters: loc.characters.filter((char) => char.id !== id),
      }));

      const updated = [...cleaned, newLocation];
      localStorage.setItem("locations", JSON.stringify(updated));
    }

    setAssignedLocation(locationName);
    setLocationName("");
  };

  return (
    <MainLayout title="Character Detail">
      <div className="flex justify-center py-10">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-[90%] sm:w-[380px] transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative bg-gradient-to-r from-[#014d30] via-[#01663f] to-[#028a56] h-36 flex justify-center items-end pb-10">
            <img
              src={char.image}
              alt={char.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md absolute bottom-[-35px]"
            />
          </div>

          <div className="pt-14 pb-6 px-6 text-center">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2 ${getStatusColorClass(
                char.status
              )}`}
            >
              {char.status.toUpperCase()}
            </span>

            <h2 className="text-2xl font-bold text-gray-800">{char.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{char.species}</p>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
              <DescRow label="Gender" value={char.gender} />
              <DescRow label="Origin" value={char.origin.name} />
              <DescRow
                label="Assigned Location"
                value={
                  <>
                    {assignedLocation ? (
                      <p className="text-center text-green-600">
                        <b>{assignedLocation}</b>
                      </p>
                    ) : (
                      <>
                        <div className="flex w-full items-center bg-white/70 backdrop-blur border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 transition">
                          <input
                            type="text"
                            placeholder="Enter location name..."
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            className="p-2 text-sm w-full text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                          />
                          <button
                            onClick={handleAssign}
                            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold px-3 py-1.5 hover:from-blue-700 hover:to-blue-600 transition-all duration-200"
                          >
                            ✓
                          </button>
                        </div>
                      </>
                    )}
                  </>
                }
              />
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
