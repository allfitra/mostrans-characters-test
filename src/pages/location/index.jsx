import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/Layouts/MainLayout";

const CharactersByLocation = () => {
  const [itemSelected, setItemSelected] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("locations") || "[]");
    setLocations(stored);
  }, []);

  return (
    <MainLayout title="Characters by Location">
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Locations
        </h2>
        {locations.length === 0 ? (
          <p className="text-gray-500 text-center">
            Tidak ada lokasi yang disimpan.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  className={`px-4 pt-1 pb-2 rounded-xl text-sm font-semibold transition-all ${
                    itemSelected?.name === loc.name
                      ? "bg-[#014d30] text-white shadow-md scale-105"
                      : "bg-[#01663f]/80 text-white hover:bg-[#01663f]"
                  }`}
                  onClick={() => setItemSelected(loc)}
                >
                  {loc.name}
                </button>
              ))}
            </div>
            {itemSelected ? (
              <div className="text-center">
                {itemSelected.characters.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Tidak ada karakter di lokasi ini.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {itemSelected.characters.map((char) => (
                      <div
                        key={char.id}
                        className="bg-white shadow rounded-lg p-3 hover:shadow-lg transition flex flex-col items-center"
                      >
                        <img
                          src={char.image}
                          alt={char.name}
                          className="rounded-lg w-full object-cover aspect-square"
                        />
                        <p className="mt-2 text-sm font-medium text-gray-700 text-center truncate w-full">
                          {char.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-sm">
                Klik salah satu lokasi untuk melihat karakter.
              </p>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CharactersByLocation;
