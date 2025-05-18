import JournalEntry from "./JournalEntry.tsx"
import Sidebar from "./Sidebar.tsx"


function MainPage() {
    return (
        <div className="flex h-screen border-1">
            <Sidebar />
            <JournalEntry />
        </div>
    );
}

export default MainPage;