import s from "./pagination.module.css";

function Pagination() {
  const handleNextPage = () => {
    if (nextToken) {
      fetchFiles(nextToken, true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const previousToken = tokens[page - 1];
      fetchFiles(previousToken, false);
      setPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div>
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={handleNextPage} disabled={!nextToken}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
