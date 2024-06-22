import { Router } from "express";
import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, getWishlist);
router.post("/", auth, addToWishlist);
router.delete("/", auth, removeFromWishlist);
router.delete("/clear", auth, clearWishlist);

export default router;
