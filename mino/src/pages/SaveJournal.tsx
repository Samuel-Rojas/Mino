import {motion} from 'framer-motion';

function SaveEntry() {

  const resumeBack = () => {
    window.location.href = '/testing';
  };

  return (
    <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.9 }}
            className="m-0 p-0 flex flex-col items-center justify-center h-screen ">
            <div>
                <input type="text" placeholder="Title" className="border-2 border-gray-400 rounded-lg p-2 mb-6 mt-6 w-full" />
                <input type="date" placeholder="Date" className="border-2 border-gray-400 rounded-lg p-2 mb-6 w-full" />
            </div>
            <div className="m-10 p-2">
                <button onClick={resumeBack} className="rounded-lg before:ease relative h-12 w-40 overflow-hidden border border-emerald-400 bg-emerald-400 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                    <span className="relative z-10">Submit</span>
                </button>
                
            </div>
        </motion.div>
  );
}
export default SaveEntry;