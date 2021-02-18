import React from "react";

function Search({ handleInput }) {
  return (
    <section className="searchBox">
      <h3>Search</h3>
      <input
        type="text"
        placeholder="filter using Movie Name"
        className="searchInput"
        onChange={handleInput}
      />
    </section>
  );
}

export default Search;
