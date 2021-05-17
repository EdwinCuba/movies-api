const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({ movie }) {
    const createdMovieID = await this.mongoDB.create(this.collection, movie);
    return createdMovieID;
  }

  async replaceMovie(movieId, data) {
    const replacedMovieID = await this.mongoDB.replace(this.collection, movieId, data);
    return replacedMovieID;
  }

  // async updateMovie() {
  //   const updateMovieID = await Promise.resolve(moviesMock[0].id);
  //   return updateMovieID;
  // }

  async deleteMovie({ movieId }) {
    const deletedMovieID = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieID;
  }
}

module.exports = MoviesService;