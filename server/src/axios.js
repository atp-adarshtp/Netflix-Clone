import axios from "axios";
import { baseUrl } from "./constens/constens";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
