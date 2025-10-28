import { Link } from "react-router-dom";
import { getGenderColorClass } from "../../../utils/ColorClass";

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

export default CardList;
