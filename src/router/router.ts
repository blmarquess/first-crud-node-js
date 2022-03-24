import { Router } from 'express';
import { createTalkerController } from "../controllers/createTalkerController";
import { getAllTalkerController } from "../controllers/getTalkerController";
import { loginController } from "../controllers/loginController";
import { testController } from "../controllers/testController";
import { updateTalkerController } from "../controllers/updateTalkerController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { validatorTalkerMiddleware } from "../middlewares/validatorTalkerMiddleware";

const router: Router = Router();

router.get("/", testController.home);

router.post("/login", loginController.login);

router.get("/talker", getAllTalkerController.getAllTalker);

router.get("/talker/:id", getAllTalkerController.getTalkerByUserId);

router.use(authMiddleware.token, validatorTalkerMiddleware.createTalker);

router.post("/talker", createTalkerController.createTalker);

router.put("/talker/:id", updateTalkerController.updateTalker);

export { router };