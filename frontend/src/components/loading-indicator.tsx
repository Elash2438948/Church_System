const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div
        className="w-12 h-12 border-4 border-gray-600 border-b-orange-500 rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;