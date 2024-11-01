import axios from "axios";

export function getRandomColor(color = []) {
  const len = color.length;
  const randomIndex = Math.floor(Math.random() * len);
  return color[randomIndex];
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
