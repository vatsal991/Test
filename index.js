import axios from "axios";
import { writeFileSync } from "node:fs";
import { data } from "./data.js";
const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDZkN2UwZjFiN2NhMmZmNjcyZGIzNzc0M2ZhNTEzNSIsInN1YiI6IjYwMmU0MmQ0MmNkZTk4MDAzYzJlZmNkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m2vfyLA30TfuuHXf1CRRvajSc7VdkzgbC60hHuc-Q7w",
  },
};

const allFilePath = [];

for (const i of data) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${i.id}/images`,
      options
    );
    const fetchData = { [i.id]: res.data.posters[0].file_path };
    allFilePath.push(fetchData);
    console.log(`data fetched for id: ${i.id}:`, {
      [i.id]: res.data.posters[0].file_path,
    });
  } catch (error) {
    console.log(`Error while fetching data for id: ${i.id}`, error);
  }
}
console.log(JSON.stringify(allFilePath));
writeFileSync("output3.json", JSON.stringify(allFilePath), "utf8");
