const env = process.env;

export default () => ({
  port: parseInt(env.PORT, 10) || 3000,
  database: {
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT, 10) || 5432,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
  },
});