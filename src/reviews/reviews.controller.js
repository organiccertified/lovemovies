const service = require("./reviews.service");

//Validation function
function exists(req, res, next) {
  service
    .read(req.params.reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      } else next({ status: 404, message: `Review cannot be found.` });
    })
    .catch(next);
}

function destroy(req, res, next) {
   service
    .destroy(req.params.reviewId)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data
  };
  service
    .update(updatedReview, req.params.reviewId)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  destroy: [
    exists,
    destroy
  ],
  update: [
    exists,
    update,
  ],
};