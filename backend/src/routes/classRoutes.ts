import { Router } from "express";
import { classController } from "../controllers/classController";

const router = Router();

router.get("/", classController.getAll);
router.get("/:id", classController.getOne);
router.post("/", classController.create);
router.put("/:id", classController.update);
router.delete("/:id", classController.remove);

export default router;
