import express from 'express';
import { intitializedDatabase } from '../database.ts';


const router = express.Router();

interface JournalEntry {
    id: number;
    title: string | null;
    content: string | null;
    date: string | null;
}

router.get('/entries', async (req, res) => {
    console.log(`Received GET request for /api/entries`);
    try {
        const db = await intitializedDatabase();
        const entries: JournalEntry[] = await db.all<JournalEntry[]>(`SELECT * FROM entries ORDER BY id DESC`);
        res.json(entries);
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
});

export default router;