import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/Layouts/MainLayout";
import CardList from "../home/components/CardList";

const CharactersByLocation = () => {
  const [itemSelected, setItemSelected] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("character_locations") || "[]"
    );
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
                  className={`px-4 pt-1 pb-1.5 rounded-xl text-sm font-semibold transition-all ${
                    itemSelected?.name === loc.name
                      ? "bg-[#014d30] text-white shadow-md scale-105"
                      : "bg-[#01663f]/80 text-white hover:bg-[#01663f]"
                  }`}
                  onClick={() => setItemSelected(loc)}
                >
                  {loc.name.toUpperCase()}
                </button>
              ))}
            </div>
            {itemSelected ? (
              <div className="text-center">
                {itemSelected.characters.length > 0 ? (
                  <CardList dataList={itemSelected.characters} />
                ) : (
                  <p className="text-gray-500 text-sm">
                    Tidak ada karakter di lokasi ini.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-sm">
                Pilih lokasi untuk melihat karakter.
              </p>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CharactersByLocation;
