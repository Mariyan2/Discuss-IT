//filters trough text 
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Search for topics"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-[400px] md:w-[500px] lg:w-[600px] p-3 rounded-full 
                   bg-white/10 backdrop-blur-md border border-white/30 
                   text-white placeholder-white/70 outline-none 
                   shadow-[0_4px_20px_rgba(0,0,0,0.1)] 
                   focus:shadow-[0_0_15px_rgba(255,255,255,0.4)] 
                   transition duration-300"
      />
    </div>
  );
};

export default SearchBar;
