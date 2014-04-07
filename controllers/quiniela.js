/**
 * GET /
 * Quiniela.
 */

exports.index = function(req, res) {
    res.render('quiniela/index', {
        title: 'Quiniela'
    });
};