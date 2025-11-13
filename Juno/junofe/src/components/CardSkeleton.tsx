
export const CardSkeleton = () => {
  return (
    <>
      <div className="bg-white border-0 overflow-hidden w-full rounded-2xl cursor-pointer animate-pulse">
          <div className="w-full h-48 bg-gray-300 rounded-t-2xl"></div>
          <div className="px-4 py-2">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
          </div>
          <div className="px-6 py-2 flex justify-center items-center">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-24 h-6"></span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-24 h-6"></span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-24 h-6"></span>
          </div>
          <div className="px-6 pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
      </div>
    </>
  );
};

