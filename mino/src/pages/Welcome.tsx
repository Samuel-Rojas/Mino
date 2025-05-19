import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Welcome() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <motion.div
      initial={{opacity: 0, x: -70 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.9}}
      className="flex flex-col items-center justify-center min-h-screen"
      >
      <h1 className="text-7xl leading-1.2 font-semibold lato">MINO</h1>
      <button 
      onClick={handleGetStarted}
      className="m-8 text-blue rounded-lg hover:before:bg-blueborder-blue-500 relative h-[50px] w-40 overflow-hidden border border-blue-500 bg-white px-3 text-blue-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:text-white hover:shadow-blue-500 hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10">Swipe</span>
      </button>
    </motion.div>
  )
}

export default Welcome
