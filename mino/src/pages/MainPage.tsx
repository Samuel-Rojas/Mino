import { useState } from "react";
import JournalEntry from "./JournalEntry.tsx"
import Sidebar from "./Sidebar.tsx"
function MainPage() {
    
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex h-screen relative">
            {isSidebarOpen && <Sidebar />}
            <div className={`flex-grow bg-white transitition-all duration-300`}>
                <JournalEntry />
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