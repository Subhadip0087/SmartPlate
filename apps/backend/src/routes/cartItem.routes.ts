import express from 'express';
import { multerUpload, singleUpload } from '../middlewares/multer.middilewares';
import { changeImage } from '../controllers/menu.controller';
import { createOrder, getCartItem } from '../controllers/cart.controller';
const cartRouter = express.Router();

cartRouter.post("/getCartItem", getCartItem);
cartRouter.post("/createOrder", createOrder);
export { cartRouter };