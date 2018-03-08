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
  const returnObject = {
    status: 'success',
    data: 'No movies!'
  };
  return knex('movie')
  .select('*')
  .then((movies) => {
    knex.destroy();
    if (movies.length) returnObject.data = movies;
    callback(null, JSON.stringify(returnObject));
  })
  .catch((err) => {
    knex.destroy();
    returnObject.status = 'error';
    returnObject.data = err;
    callback(JSON.stringify(returnObject));
  });
};
