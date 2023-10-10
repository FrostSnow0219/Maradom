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

    document.getElementsByClassName("faqContainer")[0].style.minHeight =
      window.innerHeight - x - y + "px";
  };
  // const fuzzySearch = (query) => {
  //   // Configure the fuzzy search options
  //   const options = {
  //     keys: ["question", "answer"],
  //     threshold: 0.51, // Minimum match percentage threshold
  //     useLevenshteinAutomaton: true,
  //   };

  //   // Create a new instance of the fuzzy search algorithm
  //   const fuse = new Fuse(searchData, options);

  //   // Perform the fuzzy search and get the results
  //   const results = fuse.search(query);
  //   console.log("serach result:", results);
  //   return results;
  // };

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
    inputValue != "" ? debounceSearch(inputValue) : debounceSearch(" ");
  };

  function fuzzySearch(query) {
    // Normalize the query string
    const normalizedQuery = query.trim().toLowerCase();

    // Define a minimum percentage of match
    const minMatchPercentage = 3;

    // Define an array to store the search results
    const results = [];
    // Loop through the data array
    searchData.forEach((item) => {
      // Normalize the item properties
      const normalizedQuestion = item.question.trim().toLowerCase();
      const normalizedAnswer = item.answer.trim().toLowerCase();

      // Calculate the Levenshtein distance between the query and the item properties
      const questionDistance = levenshteinDistance(
        normalizedQuery,
        normalizedQuestion
      );
      const answerDistance = levenshteinDistance(
        normalizedQuery,
        normalizedAnswer
      );
      // Calculate the average distance between the query and the item properties
      const avgDistance = (questionDistance + answerDistance) / 2;
      // Calculate the match percentage
      const maxPossibleDistance = Math.max(
        normalizedQuery.length,
        normalizedQuestion.length,
        normalizedAnswer.length
      );
      // console.log(avgDistance, maxPossibleDistance);

      const matchPercentage = Math.round(
        (1 - avgDistance / maxPossibleDistance) * 100
      );
      // console.log(matchPercentage);
      console.log(levenshteinDistance("test", "what is your test"));
      // Check if the match percentage is above the minimum
      if (matchPercentage >= minMatchPercentage) {
        // Add the item to the results array
        results.push({ item, matchPercentage });
      }
    });

    // Sort the results array by match percentage
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    console.log(results);
    // Return the results array
    return results;
  }

  // Define a function to calculate the Levenshtein distance between two strings
  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const d = [];

    for (let i = 0; i <= m; i++) {
      d[i] = [i];
    }

    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        if (str1[i - 1] === str2[j - 1]) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1;
        }
      }
    }

    return d[m][n];
  }
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
          type="search"
          placeholder="type a question"
          onChange={handleSearchInput}
          value={searchInput}
        />
      </div>
      <div className="QAList">
        {searchResults.map((value) => (
          <Collapsible header={value.item.question}>
            {value.item.answer}
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
