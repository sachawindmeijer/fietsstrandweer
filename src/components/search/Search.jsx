import React, {useState} from 'react';

import "./Search.css"

function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState('');

    function handleClick() {
        setLocationHandler(query);
    }

    function keyPressCheck(e) {
        if (e.keyCode === 13) {
            setLocationHandler(query);
        }
    }

    return (
        <span className="searchbar">
      <input
          type="text"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={keyPressCheck}
          placeholder="Zoek een locatie"
          className="searchbar-entry"
      />

      <button
          type="button"
          onClick={handleClick}
          className="searchbar-button"
      >
        Zoek
      </button>
    </span>
    );
}

export default SearchBar;
