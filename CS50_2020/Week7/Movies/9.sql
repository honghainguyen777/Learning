SELECT DISTINCT name FROM movies, stars, people
WHERE movies.year = 2004 AND movies.id = stars.movie_id AND stars.person_id = people.id
ORDER BY people.birth