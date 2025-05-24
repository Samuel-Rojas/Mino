import express from 'express';
import { intitializedDatabase } from '../database.ts';


const router = express.Router();
const sqlGetCall: string = `SELECT * FROM entries ORDER BY id DESC`;

interface JournalEntry {
    id: number | null;
    title: string | null;
    content: string | null;
    date: string | null;
}

router.get('/entries', async (req, res) => {
    console.log('Recieved GET Request from the backend');

    try {
        const db = await intitializedDatabase();
        const entries: JournalEntry[] = await db.all<JournalEntry[]>(sqlGetCall);
        res.json(entries);
    } catch (error) {
        console.error(`Error during the process of the GET Request`, error);
        res.status(500).json({message: `Failed to fetch journal entries`});
    }
})

router.delete('/entries/:id', async (req, res) => {
    const id = Number(req.params.id);
    if(!isNaN(id)){
        return res.status(400,)
    }
})

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