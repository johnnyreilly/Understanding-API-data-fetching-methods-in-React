import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import "./App.css";

const UniversitySchema = z.object({
  alpha_two_code: z.string(),
  name: z.string(),
  country: z.string(),
  domains: z.array(z.string()),
  web_pages: z.array(z.string()),
});

const UniversitiesSchema = z.array(UniversitySchema);

function Demo4() {
  const [name, setName] = useState("");

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  const {
    isLoading,
    error,
    data: universities,
  } = useQuery({
    queryKey: ["repoData", name],
    queryFn: () =>
      fetch(`http://universities.hipolabs.com/search?name=${name}`)
        .then((res) => res.json())
        .then(UniversitiesSchema.parse),
  });

  return (
    <div className="App">
      <h1>
        Demo 4 - <a href="https://github.com/colinhacks/zod">zod</a>
      </h1>
      <h2>What universities are there?</h2>
      <div className="card">
        Filter me this (
        {isLoading ? " ⏳ loading... ⏳ " : universities?.length}):{" "}
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

export default Demo4;
