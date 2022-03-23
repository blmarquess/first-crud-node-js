import { Router } from 'express';
import { getAllTalkerController } from '../controllers/getTalkerController';
import { testController } from '../controllers/testController';

const router: Router = Router();

router.get('/', testController.home);

router.get('/talker', getAllTalkerController.getAllTalker);

router.get('/talker/:id', getAllTalkerController.getTalkerByUserId); 

export { router };