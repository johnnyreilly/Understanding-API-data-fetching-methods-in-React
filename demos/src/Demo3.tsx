import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";

function Demo3() {
  const [name, setName] = useState("");

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  const {
    isLoading,
    error,
    data: universities,
  } = useQuery<any[]>({
    queryKey: ["repoData", name],
    queryFn: () =>
      fetch(`http://universities.hipolabs.com/search?name=${name}`).then(
        (res) => res.json()
      ),
  });

  return (
    <div className="App">
      <h1>Demo 3 - <a href="https://tanstack.com/query/latest/docs/react/overview">react query</a></h1>
      <h2>What universities are there?</h2>
      <div className="card">
        Filter me this ({isLoading ? ' ⏳ loading... ⏳ '  : universities?.length}):{" "}
        <input type="text" value={name} onChange={onTextChange} />

        {error ? (
          <div>Error: {error instanceof Error ? error.message : "unknown"}</div>
        ) : null}

        <ol>
          {universities?.map((uni) => (
            <li key={uni.name}>
              <a href={uni.web_pages[0]}>{uni.name}</a> ({uni.country})
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Demo3;
