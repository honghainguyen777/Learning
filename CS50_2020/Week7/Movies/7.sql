SELECT movies.title as title, ratings.rating as rating
FROM movies, ratings
WHERE movies.year = 2010 AND movies.id = ratings.movie_id AND rating > 0
ORDER BY rating DESC, movies.title