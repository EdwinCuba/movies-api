const express = require('express');
const MovieService = require('../services/movies');

const {
  movieIdSchema,
  createMoviechema,
  updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middlewares/validationHandler');

const moviesAPI = app => {
  const router = express.Router();
  app.use('/api/movies', router);

  const movieService = new MovieService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await movieService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'Listed'
      })
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { movieId } = req.params;

    try {
      const movie = await movieService.getMovie({ movieId });

      res.status(200).json({
        data: movie,
        message: 'Movie retrieved'
      })
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createMoviechema), async (req, res, next) => {
    const { body: movie } = req;

    try {
      const createdMovieID = await movieService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieID,
        message: 'Movie Create'
      })
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const replacedMovieID = await movieService.replaceMovie(movieId, movie);

      res.status(200).json({
        data: replacedMovieID,
        message: 'Movie replaced'
      })
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updateMovieID = await movieService.updateMovie({ movieId, movie });

      res.status(200).json({
        data: updateMovieID,
        message: 'Movie update'
      })
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { movieId } = req.params;

    try {
      const deleteMovieID = await movieService.deleteMovie({ movieId });

      res.status(200).json({
        data: deleteMovieID,
        message: 'Movie deleted'
      })
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesAPI;