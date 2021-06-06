import sqlite3 from 'sqlite3';

const DB_FILE = '.database.sqlite';

let database: sqlite3.Database | undefined;

const init = async (): Promise<sqlite3.Database> => {
  if (!database) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(DB_FILE, (error) => {
        if (error) {
          reject(error);
          return;
        }

        console.log('Connected to the database.');
        database = db;
        resolve(database);
      });
    });
  }

  return database;
};

const getInstance = async (): Promise<sqlite3.Database> => {
  if (!database) {
    return init();
  }

  return database;
};

export const close = (): void => {
  database?.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
  });
};

export const runQuery = async <T>(
  sql: string,
  params: (string | number)[] = []
): Promise<T[]> => {
  const database = await getInstance();

  return new Promise((resolve, reject) => {
    database.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
};
