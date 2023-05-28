interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      {pages.map((page) => (
        <a
          key={page}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`${page === currentPage ? 'bg-orange-400 text-white' : 'text-gray-900'
            } mt-4 relative z-10 hover:cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </a>
      ))}
    </nav>
  );
};

export default Pagination;
