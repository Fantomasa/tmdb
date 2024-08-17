export default () => ({
  MONGO_URI: process.env.MONGO_URI,
  PORT: parseInt(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB: process.env.TMDB
});
