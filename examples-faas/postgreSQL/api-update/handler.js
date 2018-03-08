const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB
  }
});

module.exports = (content, callback) => {
  const movie = JSON.parse(content);
  const returnObject = {
    status: 'success',
    data: 'Movie does not exist!'
  };
  return knex('movie')
  .update({'name': movie.name})
  .where({ id: parseInt(movie.id) })
  .returning('*')
  .then((movies) => {
    knex.destroy();
    if (movies.length) returnObject.data = `Movie id ${movie.id} updated!`;
    callback(null, JSON.stringify(returnObject));
  })
  .catch((err) => {
    knex.destroy();
    returnObject.status = 'error';
    returnObject.data = err;
    callback(JSON.stringify(returnObject));
  });
};
