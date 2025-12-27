import { Router } from "express";
import { studentController } from "../controllers/studentController";

const router = Router();

router.get("/", studentController.getAll);
router.get("/:id", studentController.getOne);
router.post("/", studentController.create);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.remove);

export default router;
