SELECT DISTINCT people.name
FROM directors, ratings, people
WHERE ratings.rating >= 9.0 AND ratings.movie_id = directors.movie_id
AND directors.person_id = people.id