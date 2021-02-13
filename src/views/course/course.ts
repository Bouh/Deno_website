import { exists, existsSync, parseMarkdown, Router } from '../../deps.ts';

const router = Router();

router.route('/:courseName/chapter/:chapter').get(function (req, res, next) {
    const fileName =
        `${Deno.cwd()}/files/courses/` +
        req.params.courseName +
        `/` +
        req.params.chapter +
        `.md`;
    const decoder = new TextDecoder('utf-8');

    if (!existsSync(fileName)) res.redirect('/error');

    const data = Deno.readFileSync(fileName);
    const markdown = decoder.decode(data);

    res.render('course/course', {
        title: req.params.chapter,
        markdown: parseMarkdown(markdown),
    });
});

export default router;
