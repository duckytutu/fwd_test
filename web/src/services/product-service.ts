import { GetProductParams } from "../types/request";
import { createService } from "./base";

const baseURL = "http://localhost:8000/api/products"; //process.env.REACT_APP_PRODUCTS_API;
const instance = createService(baseURL);

async function getProduct(request: GetProductParams) {
  const body = request;
  const response = await instance.post("/calculate", body);
  return response.data.data;
}

const service = {
  getProduct,
};

export default service;
