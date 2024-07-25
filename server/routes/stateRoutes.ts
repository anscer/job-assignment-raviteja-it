import { Router } from 'express';
import { createState, getStates, updateState, deleteState } from '../controllers/stateController';
import { isAuthenticated } from '../middleware/auth';

const router: Router = Router();

router.post('/states', createState);
router.get('/states', getStates);
router.put('/states/:id', isAuthenticated, updateState);
router.delete('/states/:id', isAuthenticated, deleteState);

export default router;