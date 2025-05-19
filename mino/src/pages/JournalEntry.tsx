import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JournalEntry() {
    const [entryContent, setEntryContent] = useState("");
    const navigate = useNavigate();

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntryContent(event.target.value);
    };

    const handleSave = () => {
        //For now just log the content to the console
        console.log("Entry saved!:", entryContent);
        navigate("/savejournal");

    }

    return (
        <div className="flex flex-col h-full p-6">
            <textarea
                className="flex-grow rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                placeholder="Write your journal entry here..."
                value={entryContent}
                onChange={handleContentChange}
            ></textarea>

            <button 
            onClick={handleSave}
            className="mt-4 bg-green-500 py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            disabled={!entryContent.trim()}
            >Save Entry</button>
        </div>
    );
}

export default JournalEntry;