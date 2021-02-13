import { Router, config, isScriptHotReloadEnabled } from '../../deps.ts';

config({ export: true });

const router = Router();

// GET home page.
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Opine',
        scriptHotReload: isScriptHotReloadEnabled(),
    });
});

export default router;
