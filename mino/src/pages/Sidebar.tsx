// No props are needed for the Sidebar component in this full collapse scenario
function Sidebar() {
    return (
        // Keep the fixed width for the open state
        <div className="w-64 bg-gray-200 p-4 border-r border-gray-300 flex flex-col">
             {/* The toggle button is now in MainPage */}
            <h1 className="text-center text-lg font-semibold mb-6">Journal Entries</h1>
            {/* Past Entries List */}
            <ul className="border-1 rounded-lg flex-grow overflow-y-auto">
                <li className="p-2 hover:bg-gray-300 cursor-pointer rounded">Dumby 1</li>
                <li className="p-2 hover:bg-gray-300 cursor-pointer rounded">Dumby 2</li>
                <li className="p-2 hover:bg-gray-300 cursor-pointer rounded">Dumby 3</li>
            </ul>
            {/* Username and Logout Button */}
            <div className="mt-10 border-t border-gray-400 pt-4">
                <div className="text-sm mb-2">Logged in as: Username</div>
                <button className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600">Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;