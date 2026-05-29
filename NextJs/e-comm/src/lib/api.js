import axios from "axios";

export let api = axios.create({
  baseURL: "https://api.team-sync.space",
  withCredentials: true,
});
