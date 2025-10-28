
const statusColorClass = (status) => {
  if (status === "Alive") return "bg-green-100 text-green-700";
  if (status === "Dead") return "bg-red-100 text-red-700";
  return "bg-gray-200 text-gray-700";
};

const getGenderColorClass = (gender) => {
  if (gender === "Male") return "text-blue-700";
  if (gender === "Female") return "text-pink-700";
  return "text-gray-700";
};

export { statusColorClass, getGenderColorClass };
