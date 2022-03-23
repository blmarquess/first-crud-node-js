import { Router } from 'express';
import { getAllTalkerController } from '../controllers/getAllTalkerController';
import { testController } from '../controllers/testController';

const router: Router = Router();

router.get('/', testController.home);
// router.get('/', (_request:Request, response: Response) => {
//   response.status(HTTP_OK_STATUS).send();
// });

router.get('/talker', getAllTalkerController.getAllTalker);  

export { router };