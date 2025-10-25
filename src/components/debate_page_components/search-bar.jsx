//filters trough text 
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Search for topics"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-1/2 p-3 rounded-full bg-white/60 backdrop-blur-md text-gray-700 placeholder-gray-500 outline-none shadow-md focus:shadow-lg transition duration-200"
      />
    </div>
  );
};

export default SearchBar;