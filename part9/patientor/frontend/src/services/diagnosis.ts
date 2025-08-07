import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const baseUrl = `${apiBaseUrl}/diagnoses`;

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(baseUrl);

  return data;
};

export default {
  getAll,
};
