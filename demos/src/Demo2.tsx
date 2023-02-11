import { useEffect, useState } from "react";
import "./App.css";

/**
 * based on https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data
 * @param url 
 * @param defaultValue 
 * @returns 
 */
function useData<T>(url: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  
  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
}

function Demo2() {
  const [name, setName] = useState("");

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  const universities = useData(
    `http://universities.hipolabs.com/search?name=${name}`,
    [] as any[]
  );

  return (
    <div className="App">
      <h1>Demo 2 - custom hook</h1>
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

export default Demo2;
