import { Router } from "express";
import {
  addComment,
  createProduct,
  getAllProducts,
  getComments,
  updateProduct,
} from "../controllers/product";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", getAllProducts);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);

export default router;
