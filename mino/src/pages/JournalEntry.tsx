import { useState, useEffect } from "react";

interface JournalEntry {
  id: number | null;
  title: string | null;
  content: string | null;
  date: string | null;
}

function JournalEntry() {
  const [newEntryTitle, setNewEntryTitle] = useState<string>("");
  const [newEntryContent, setNewEntryContent] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Loading journal entries...."
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchJournalEntries = async () => {
    setLoadingMessage("Loading journal entries...");
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:3001/api/entries");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: JournalEntry[] = await response.json();
      setJournalEntries(data);
      setLoadingMessage("");
    } catch (error) {
      console.log(`Error fetching journal entries: ${error}`);
      setErrorMessage(
        "Failed to load journal entries. Please check the backend server."
      );
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);

    if (!newEntryTitle || !newEntryContent) {
      setFormMessage("Please provide both title and content");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newEntryTitle,
          content: newEntryContent,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || `HTTP Error! status: ${response.status}`
        );
      }

      setFormMessage(responseData.message || "Entry added successfully!");
      setNewEntryTitle("");
      setNewEntryContent("");

      await fetchJournalEntries();
    } catch (error: any) {
      console.error("Error adding new entry: ", error);
      setFormMessage(`Error: ${error.message || "Failed to add entry."}`);
    }
  };

  return (
    <section className="flex flex-col h-full p-6">
      <form onSubmit={handleSave}>
        <textarea
          className="flex-grow rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
          placeholder="Write your journal entry here..."
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Enter Title"
          className="border-2 border-gray-400 rounded-lg p-2 mb-6 mt-6 w-full"
          value={newEntryTitle}
          onChange={(e) => setNewEntryTitle(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 bg-green-500 py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={!newEntryContent.trim() && !newEntryTitle.trim()}
        >
          Save Entry
        </button>
        {formMessage && <p>{formMessage}</p>}
      </form>
    </section>
  );
}

export default JournalEntry;
