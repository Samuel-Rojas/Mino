import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_PATH = './journal.db';

let db: Awaited<ReturnType<typeof open>> | null = null;

export async function intitializedDatabase() {
    if (db) {
        console.log('Database already initialized');
        return db;
    } try {
        db = await open({
            filename: DB_PATH,
            driver: sqlite3.Database,
        });

        console.log('Database successfully initialized at path: ', DB_PATH);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                content TEXT,
                date TEXT DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('ensured "entries" table exists');
            return db;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error; 
    }
}