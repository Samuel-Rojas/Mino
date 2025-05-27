import { useState, useEffect} from "react";
import { type EntryTypes} from "./Types.ts"
import Sidebar from "./Sidebar.tsx"
import JournalEntry from "./JournalEntry.tsx";


function MainPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // useState from react's built-in hooks to have a simple boolean to check if the sidebar is toggled or not

  const [entries, setEntries] = useState<EntryTypes[]>([]);
  // useState from react's built-in hooks to use the entry types interface object that contains a few parameters the journal would take to parse to the backend

  const [selectedId, setSelectedId] = useState<number | null>(null);
  // useState from react's built-in hooks to contain the current ID selected on the sidebar, which is either a interger(number in ts) or null

  useEffect(() => {
    fetch("http://localhost:3001/api/entries")
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error(error));
  }, []);
  // useHook from react's built-in hooks to render once the component mounts
  // Uses the fetch API to call the backend to speciic endpoint(entries)
  // Then get's a response and turns it into a json response
  // Then get's the json response and updates the setEntries variable to contain new entries
  // If an error occurs then a error would return
  // This is called a GET Request

  const deleteEntry = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/entries/${id}`, {
        method: "DELETE",
      });
      setEntries(entries.filter((e) => e.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
      }
    } catch (error) {
      console.error("Failed to delte entry", error);
    }
  };
  // Async function that is meant to delete a entry from the database
  // Creates a try/catch block
  // Tries to fetch the api and delete the entry bases on the ID
  // Checks if the current ID is the same to make the selected id to be null in order for the selection process to end

  const updateHandler = async (id: number, title: string, content: string) => {
    try {
      await fetch(`https://localhost:3001/api/entries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      setEntries(
        entries.map((e) => (e.id === id ? { ...e, title, content } : e))
      );
    } catch (error) {
      console.error("Failed to update entry", error);
    }
  };
  //Another async function that updates the db bases on the ID, which includes the title and the content being sent in a json format to the backend

  const selectedEntry = entries.find((e) => e.id == selectedId || null) || null;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      {isSidebarOpen && (
        <Sidebar
          entries={entries}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          onDelete={deleteEntry}
        />
      )}
      <div className={`flex-grow bg-white transitition-all duration-300`}>
        <JournalEntry entry={selectedEntry} onUpdate={updateHandler} />
      </div>
      <button
        onClick={toggleSidebar}
        className={`absolute bottom-4 ${
          isSidebarOpen ? "left-64" : "left-4"
        } ml-1 p-1 rounded bg-gray-300 hover:bg-gray-400 z-10 transition-all duration-400`}
        style={{ transition: "left 400ms ease-in-out" }}
      >
        {isSidebarOpen ? "<" : ">"}
      </button>
    </div>
  );
}

export default MainPage;