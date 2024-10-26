import axios from "axios";

const instance = axios.create({
  baseURL: "https://hemant1977.pythonanywhere.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
