import express from 'express';
import { intitializeDatabase } from '../database.ts';
import { type EntryTypes } from '../../../src/pages/Types.ts'


const router = express.Router();
const sqlGetCall: string = `SELECT * FROM entries ORDER BY id DESC`;

router.get('/entries', async (_req, res) => {
    console.log('Recieved GET Request from the backend');

    try {
        const db = await intitializeDatabase();
        const entries: EntryTypes[] = await db.all<EntryTypes[]>(sqlGetCall);
        res.json(entries);
    } catch (error) {
        console.error(`Error during the process of the GET Request`, error);
        res.status(500).json({message: `Failed to fetch journal entries`});
    }
})

router.delete('/entries/:id', async (req, res): Promise<any> => {
    const id = Number(req.params.id);
    if(!isNaN(id)){
        return res.status(400).json({message: 'Invalid ID Provided' });
    }
    try {
        const db = await intitializeDatabase();
        await db.run('DELETE FROM entries WHERE id = ?', [id]);
        res.json({message: 'Entry Successfully Deleted'});
    } catch (error){
        console.error('Error deleting entry:', error);
        res.status(500).json({error: 'Failed to delte entry'});
    }
});

router.put('/entries/:id', async (req, res): Promise<any> => {
    const id: number = Number(req.params.id);
    const { title, content } = req.body;

    if(isNaN(id) || !title || !content) {
        return res.status(400).json({error: 'Valid ID, title and content are required' });
    }
    try {
        const db = await intitializeDatabase();
        await db.run (
            'UPDATE entries SET title = ?, content = ? where id = ?',
            [title, content, id]
        );
        res.json({message: 'Entry updated successfully'})
    } catch (error) {
        console.error('Error updating entry:', error)
        res.status(500).json({error: 'Failed to update entry'})
    }
})

router.post('/entries', async (req, res): Promise<any> => {
    console.log("Recieved Post Request from the /api/entries");

    const { title, content } = req.body;

    if(!title || !content) {
        return res.status(400).json({message: `Title and Content are not recieved`});
    }

    try {
        const db = await intitializeDatabase();

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
                date: new Date().toISOString()
            },
        });
    } catch (error) {
        console.log(`Error adding new journal entry to database:`, error);
        res.status(500).json({message: `Internal Server Error`});
    }
    
});




export default router;