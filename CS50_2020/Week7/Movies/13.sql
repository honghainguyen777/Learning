SELECT DISTINCT people.name FROM movies, people, stars
WHERE movies.id IN (
SELECT DISTINCT movies.id as movie_id FROM movies, stars, people
WHERE people.name = "Kevin Bacon" AND people.birth = 1958
AND movies.id = stars.movie_id
AND stars.person_id = people.id
)
AND movies.id = stars.movie_id
AND stars.person_id = people.id
AND people.name != "Kevin Bacon"