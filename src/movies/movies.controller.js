const service = require("./movies.service");

function list(req, res, next) {
  service
    .list(req.query.is_showing)
    .then((data) => res.json({ data }))
    .catch(next);
}
//Validation function
function exists(req, res, next) {
  service
    .read(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
    })
    .catch(next);
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

function listTheaters(req, res, next) {
  service
    .listTheaters(req.params.movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

function listReviews(req, res, next) {
  service
    .listReviews(req.params.movieId)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
  read: [exists, read],
  listTheaters,
  listReviews
};