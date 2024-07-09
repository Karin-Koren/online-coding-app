import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Lobby.css";

const Lobby = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  // Fetch the code blocks from the server
  useEffect(() => {
    fetch("http://localhost:3002/codeblocks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCodeBlocks(data))
      .catch((error) => console.error("Error fetching code blocks:", error));
  }, []);

  return (
    <div className="centerContainer">
      <header>
        <h1>Welcome to the Online Coding App</h1>
      </header>
      <h1 className="lobby-title">Choose code block</h1>
      <ul className="list">
        {codeBlocks.map((block, index) => (
          <li key={index} className="listItem">
            <Link to={`/codeblock/${index}`} state={block} className="listLink">
              {block.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
