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

router.post('/entries', async (req, res): Promise<any> => {
    console.log("Recieved Post Request from the /api/entries");

    const { title, content } = req.body;

    if(!title || !content) {
        return res.status(400).json({message: `Title and Content are not recieved`});
    }

    try {
        const db = await intitializedDatabase();

        const result = await db.run(
            `INSERT INTO entries (title, content) VALUES (?, ?)`,
            [title, content]
        );

        const newEntryId = result.lastID;
        console.log(`New entry added with ID: ${newEntryId}`);

        res.status(201).json({
            message: `Journal entry created successfully`,
            entry: {
                id: newEntryId,
                title, 
                content,
                date: new Date().toString()
            },
        });
    } catch (error) {
        console.log(`Error adding new journal entry to database:`, error);
        res.status(500).json({message: `Internal Server Error`});
    }
    
});


export default router;