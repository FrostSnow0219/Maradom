import React, { useEffect, useRef, useState } from "react";
import searchData from "../../search-data.json";
import Collapsible from "../../components/collapse";
import Fuse from "fuse.js";

const FAQ = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const heightHandler = () => {
    const x = document.getElementsByClassName("header")[0].clientHeight;
    const y = document.getElementById("footer").clientHeight;

    document.getElementsByClassName("faqContainer")[0].style.height =
      window.innerHeight - x - y + "px";
  };
  const fuzzySearch = (query) => {
    // Configure the fuzzy search options
    const options = {
      keys: ["question", "answer"],
      threshold: 0.51, // Minimum match percentage threshold
      useLevenshteinAutomaton: true,
    };

    // Create a new instance of the fuzzy search algorithm
    const fuse = new Fuse(searchData, options);

    // Perform the fuzzy search and get the results
    const results = fuse.search(query);
    return results;
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const debounceSearch = debounce((inputValue) => {
    const results = fuzzySearch(inputValue);
    setSearchResults(results);
  }, 1000);
  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    // Debounce the search execution to prevent excessive calls
    debounceSearch(inputValue);
  };
  useEffect(() => {
    const header_height =
      document.getElementsByClassName("header")[0].clientHeight;
    const footer_height =
      document.getElementsByClassName("footer")[0].clientHeight;
    document.getElementsByClassName("faqContainer")[0].style.height =
      window.innerHeight - header_height - footer_height + "px";
    window.addEventListener("resize", heightHandler);
    const results = fuzzySearch(searchInput);
    setSearchResults(results);
    debounceSearch("");
    return window.removeEventListener("resize", heightHandler);
  }, []);

  return (
    <div className="faqContainer">
      <div className="search-form">
        <img src="images/search-normal.svg" />
        <input
          type="input"
          placeholder="type a question"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </div>
      <div className="QAList">
        {searchResults.map((value) => (
          <Collapsible header={value.item.question} open={false}>
            {value.item.answer}
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
