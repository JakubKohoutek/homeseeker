import sqlite3 from 'sqlite3';

const init = async (): Promise<void> => {
  const DB_FILE = '.database.sqlite';

  return new Promise<sqlite3.Database>((resolve, reject) => {
    const database = new sqlite3.Database(DB_FILE, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(database);
    });
  }).then((database) => {
    return new Promise((resolve, reject) => {
      database.run(
        `CREATE TABLE estates (
          id INTEGER PRIMARY KEY,
          status TEXT NOT NULL,
          note TEXT NOT NULL,
          data TEXT NOT NULL UNIQUE
        );`,
        (error) => {
          if (error) {
            reject(error);
            return;
          }

          database.close();
          resolve();
        }
      );
    });
  });
};

init()
  .then(() => {
    console.info('Database initialized.');
  })
  .catch((error) => {
    console.error(error);
  });
