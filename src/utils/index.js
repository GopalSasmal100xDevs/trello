import axios from "axios";

export function getRandomColor(color = []) {
  const len = color.length;
  const randomIndex = Math.floor(Math.random() * len);
  return color[randomIndex];
}

export function getSortedBoards(
  boards = [],
  sortCriteria = "ALPHABETICALLY_A_Z"
) {
  return boards.sort((a, b) => {
    if (sortCriteria === "ALPHABETICALLY_A_Z") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "ALPHABETICALLY_Z_A") {
      return b.name.localeCompare(a.name);
    } else return 0;
  });
}

export function getSearchedBoards(boards = [], searchString = "") {
  return boards.filter(({ name }) =>
    name.toLowerCase().includes(searchString.trim().toLowerCase())
  );
}

export function postData(url) {
  return axios.post(url);
}

export function getData(url) {
  return axios.get(url);
}

export function deleteData(url) {
  return axios.delete(url);
}

export function putData(url) {
  return axios.put(url);
}
