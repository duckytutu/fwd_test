import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import { productFeign } from "src/feign-services/product";

const { OK } = StatusCodes;

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getProduct(req: Request, res: Response) {
  const params = req.body;
  const feignClient = productFeign;
  const data = await feignClient.getProduct({}, params);
  console.log(data);
  return res.status(OK).json({ data });
}
