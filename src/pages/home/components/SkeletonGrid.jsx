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
export default SkeletonGrid;
