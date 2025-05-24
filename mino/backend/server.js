import express from 'express';
import JournalRoutes from './src/routes/journalRoutes.ts';
import cors from 'cors';
import { intitializedDatabase } from './src/database.ts';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', JournalRoutes);

app.get('/', (req, res) => {
  console.log('Backend server is running smoothly on their part');
});

const startServer = async () => {
  
  try {
    await intitializedDatabase();
    console.log('Database intiliazed successfully. Staring the server...');
    app.listen(port, () => {
      console.log(`Backend server is listening on port ${port}`);
      console.log(`Access the backend with http://localhost:${port}`);
      console.log(`Journal Entries endpoint: http://localhost:${port}/api/entries`);
    })
  } catch (error) {
    console.error('Error initializing the database:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();