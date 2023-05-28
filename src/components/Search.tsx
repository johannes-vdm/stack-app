interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by user name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 border border-gray-300 rounded-md mb-4 w-full"
    />
  );
};

export default Search;