const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(is_showing) {
  return (is_showing) ? (
    knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing")
    .where({ "is_showing": 1 })
    .distinct()
  ) : (
    knex("movies").select("*")
  );
}

function read(id) {
  return knex("movies").select("*").where({ movie_id: id }).first();
}

function listTheaters(id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": id });
}

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function listReviews(id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": id })
    .then((data) => data.map(r => addCritic(r)));
}

module.exports = {
  list,
  read,
  listTheaters,
  listReviews
};