import axios, { AxiosInstance } from "axios";
import { FeignBuilder, post } from "src/feign";

const ecomApiUrl = "https://api.fwd.co.th/dev-ecommerce"; //process.env.ECOMM_API;

const baseConfig = (
  baseURL?: string,
  contentType: string = "application/json"
) => {
  return {
    baseURL: baseURL,
    headers: {
      "Accept-Language": "en-US",
      "Content-Type": contentType,
    },
  };
};

const createService = (
  baseURL?: string,
  contentType: string = "application/json"
): AxiosInstance => {
  return axios.create(baseConfig(baseURL, contentType));
};

const productsService = createService(ecomApiUrl);

class RestApi {
  @post("/getProduct")
  public async getProduct(param: object, body: any): Promise<object> {
    throw -1;
  }
}

const feign = new FeignBuilder(productsService);
export const productFeign = feign.target(RestApi);
