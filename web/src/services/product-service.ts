import { AxiosResponse } from 'axios';
import { GetProductParams } from '../types/request';
import { Product } from '../types/response';
import { createService } from './base';

const baseURL = 'https://api.fwd.co.th/dev-ecommerce';//process.env.REACT_APP_PRODUCTS_API;
const instance = createService(baseURL);

async function getProduct(request: GetProductParams) {
  const body = request;
  const response: AxiosResponse<{
    data: Product[];
    message: string;
  }> = await instance.post('/getProduct', body);
  return response.data;
}

const service = {
  getProduct,
};

export default service;
