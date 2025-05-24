import { useState, useEffect} from "react";
import { type EntryTypes} from "./Types.ts"
import Sidebar from "./Sidebar.tsx"
import JournalEntry from "./JournalEntry.tsx";


function MainPage() {
    
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [entries, setEntries] = useState<EntryTypes[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/entries')
        .then(response => response.json())
        .then(data => setEntries(data))
        .catch(error => console.error(error))
    }, []);

    const deleteEntry = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/api/entries/${id}`, {
                method: 'DELETE',
            });
            setEntries(entries.filter(e => e.id !== id));
            if(selectedId === id){
                setSelectedId(null);
            }
        } catch (error) {
            console.error('Failed to delte entry', error);
        }
    }

    const updateHandler = async (id: number, title: string, content: string ) => {
        try {
            await fetch(`https://localhost:3001/api/entries/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });
            setEntries(entries.map(e => (e.id === id ? {...e, title, content} : e))
        );
        } catch (error) {
            console.error('Failed to update entry', error);
        }
    }

    const selectedEntry = entries.find((e) => e.id == selectedId || null) || null;

 
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen relative">
            {isSidebarOpen && <Sidebar
                entries={entries}
                selectedId={selectedId}
                onSelect={id => setSelectedId(id)}
                onDelete={deleteEntry}
            />}
            <div className={`flex-grow bg-white transitition-all duration-300`}>
                <JournalEntry 
                entry={selectedEntry} 
                onUpdate={updateHandler}
                />
            </div>
            <button 
            onClick={toggleSidebar} 
            className={`absolute bottom-4 ${isSidebarOpen ? 'left-64' : 'left-4'} ml-1 p-1 rounded bg-gray-300 hover:bg-gray-400 z-10 transition-all duration-400`}
            style={{transition: 'left 400ms ease-in-out'}}
            >{isSidebarOpen ? '<' : '>'}
            </button>
        </div>
    );
}

export default MainPage;