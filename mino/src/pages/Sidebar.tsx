import { type EntryTypes } from './Types'

interface SideProps {
    entries: EntryTypes[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
}

function Sidebar({entries, selectedId, onSelect, onDelete}: SideProps)  {
    return (
        // Keep the fixed width for the open state
        <aside className="w-64 bg-gray-200 p-4 border-r border-gray-300 flex flex-col">
             {/* The toggle button is now in MainPage */}
            <h1 className="text-center text-lg font-semibold mb-6">Journal Entries</h1>
            {/* Past Entries List */}
            <ul className="flex-grow overflow-y-auto border-1 rounded-lg">
               {entries.map(e => (
                <li
                    key={e.id}
                    onClick={() => onSelect(e.id!)}
                    className={`
                    flex justify-between items-center p-2 rounded cursor-pointer
                    ${e.id === selectedId ? 'bg-gray-300 font-bold': 'hover:bg-gray-300'}    
                    `}>
                        <span onClick={() => onSelect(e.id!)}>
                            {e.title || 'Untitled'}
                        </span>
                        <button
                            onClick={() => onDelete(e.id!)}
                            className="text-red-600 hover:text-red-800 ml-2"
                            title="Delete entry"
                        >
                        x
                        </button>
                    </li>
               ))}
            </ul>
            {/* Username and Logout Button */}
            <div className="mt-10 border-t border-gray-400 pt-4">
                <div className="text-sm mb-2">Logged in as: Username</div>
                <button className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600">Logout</button>
            </div>
        </aside>
    );
}

export default Sidebar;