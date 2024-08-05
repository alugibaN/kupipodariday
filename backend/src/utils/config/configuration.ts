export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3001,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'student',
    password: process.env.DB_PASSWORD || 'student',
    name: process.env.DB_NAME || 'kupipodariday',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'hard-secret',
    expiresIn: '7d',
  },
});
