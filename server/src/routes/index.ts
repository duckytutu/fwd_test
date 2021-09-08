import { Router } from "express";
import { getProduct } from "./Product";
import { addOneUser, deleteOneUser, getAllUsers, updateOneUser } from "./Users";

// User-route
const userRouter = Router();
userRouter.get("/all", getAllUsers);
userRouter.post("/add", addOneUser);
userRouter.put("/update", updateOneUser);
userRouter.delete("/delete/:id", deleteOneUser);

// Product-route
const productRouter = Router();
productRouter.post("/calculate", getProduct);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/users", userRouter);
baseRouter.use("/products", productRouter);
export default baseRouter;
