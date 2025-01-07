const Loader = () => {
  return (
    <div className="fixed inset-0 bg-neutral-700  bg-opacity-100 flex justify-center items-center z-[1000]">
      <div className="text-center flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <p className="mt-4 text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
