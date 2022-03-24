import { Router } from 'express';
import { createTalkerController } from "../controllers/createTalkerController";
import { getAllTalkerController } from "../controllers/getTalkerController";
import { loginController } from "../controllers/loginController";
import { testController } from "../controllers/testController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get("/", testController.home);

router.post("/login", loginController.login);

router.get("/talker", getAllTalkerController.getAllTalker);

router.get("/talker/:id", getAllTalkerController.getTalkerByUserId);

router.use(authMiddleware.token);

router.post("/talker", createTalkerController.createTalker);

export { router };