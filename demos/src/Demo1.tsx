import { useEffect, useState } from "react";
import "./App.css";

function Demo1() {
  const [name, setName] = useState("");
  const [universities, setUniversities] = useState([] as any[]);

  // http://universities.hipolabs.com/search?name=m&country=turkey

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    loadUniversities(event.target.value);
  }

  function loadUniversities(name: string) {
    fetch(`http://universities.hipolabs.com/search?name=${name}`)
      .then((response) => response.json())
      .then((data) => setUniversities(data));
  }

  return (
    <div className="App">
      <h1>Demo 1 - basic</h1>
      <h2>What universities are there?</h2>
      <div className="card">
        Filter me this ({universities.length}):{" "}
        <input type="text" value={name} onChange={onTextChange} />
        <ol>
          {universities.map((uni) => (
            <li key={uni.name}>
              <a href={uni.web_pages[0]}>{uni.name}</a> ({uni.country})
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Demo1;
