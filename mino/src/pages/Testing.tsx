import { useState, useEffect } from 'react';

interface JournalEntry {
    id: number;
    content: string | null;
    title: string | null;
    date: string | null;
}

function Testing() {

    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<string>('loading Entries...');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchJournalEntries = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/entries');

                if (!response.ok) {
                    throw new Error('Network response was not ok, error code: ${response.status}');
                }
                const data: JournalEntry[] = await response.json();
                setJournalEntries(data);
                setLoadingMessage('Entries loaded successfully');
            } catch (error) {
                console.log('Error fetching journal entries:', error);
                setErrorMessage('Failed to load entries. Check the backend.');
                setLoadingMessage(''); // Clear loading message
            }
        };
        fetchJournalEntries();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>My Journal App</h1>
                <h2>Your Entries</h2>

                {/* Display loading message */}
                {loadingMessage && <p>{loadingMessage}</p>}

                {/* Display error message if any */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Display journal entries or a message if none */}
                {journalEntries.length > 0 ? (
                    <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
                        {journalEntries.map((entry) => (
                            <div key={entry.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                                <h3>{entry.title || 'Untitled Entry'}</h3>
                                <p>{entry.content || 'No content.'}</p>
                                <small>Date: {entry.date ? new Date(entry.date).toLocaleDateString() : 'N/A'}</small>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loadingMessage && !errorMessage && <p>No journal entries found.</p>
                )}
            </header>
        </div>
    );

}

export default Testing;