import { Router } from '../../deps.ts';

const router = Router();

// GET home page.
router.get('/', (req, res, next) => {
    res.send('Users are coming shortly!');
});

export default router;
