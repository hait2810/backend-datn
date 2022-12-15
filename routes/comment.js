import express from "express";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

import {
  create,
  getByProduct,
  list,
  listComment,
  read,
  remove,
  update,
} from "../controllers/comment";

const router = express.Router();

router.get("/comment", list);
router.get("/comments", listComment);
router.get("/comment/getByProduct/:id", getByProduct);
router.get("/comment/:id", read);
router.delete("/comment/:id", requireSignin, isAuth, remove);
router.post("/comment", requireSignin, isAuth, create);
router.put("/comment/:id", requireSignin, isAuth, update);

export default router;
