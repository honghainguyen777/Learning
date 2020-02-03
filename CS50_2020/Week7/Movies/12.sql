SELECT DISTINCT movies.title FROM movies, stars, people
WHERE (people.name = "Johnny Depp" OR people.name = "Helena Bonham Carter")
AND stars.person_id = people.id
AND stars.movie_id = movies.id
GROUP BY  movies.title HAVING count(*) > 1