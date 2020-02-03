SELECT name FROM people, movies, stars
WHERE movies.title LIKE "%Toy Story%"
AND movies.id = stars.movie_id
AND stars.person_id = people.id