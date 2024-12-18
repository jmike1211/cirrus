import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [process.env.NODE_ENV === 'production' ? 'dist/db/entity/*.js!(Base.js)' : 'src/db/entity/*.ts!(Base.ts)'],
  migrations: [process.env.NODE_ENV === 'production' ? 'dist/db/migrations/mssql/*.js' : 'src/db/migrations/mssql/*.ts'],
  synchronize: true, 
  logging: true,
});

export default dataSource