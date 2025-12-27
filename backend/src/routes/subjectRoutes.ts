import { Router } from "express";
import { subjectController } from "../controllers/subjectController";

const router = Router();

router.get("/", subjectController.getAll);
router.get("/:id", subjectController.getOne);
router.post("/", subjectController.create);
router.put("/:id", subjectController.update);
router.delete("/:id", subjectController.remove);

export default router;
