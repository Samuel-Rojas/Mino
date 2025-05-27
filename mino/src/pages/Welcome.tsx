import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/login");
  };

  //Using the React Router Feature to navigate to the login page, when called

  return (
    //Using Framer Motion for the animations on startup
    <motion.div
      initial={{ opacity: 0, x: -70 }}
      //Initial attribute to have the starting point of the rendering
      animate={{ opacity: 1, x: 0 }}
      //Animates, which is after the initial finishes
      exit={{ opacity: 0, x: 50 }}
      //Exit is after the animate finishes and the end point of the animation
      transition={{ duration: 0.9 }}
      //Transition is how long this whole animation takes
      className="flex flex-col items-center justify-center min-h-screen"
      //flex-box, flex-columns format, center the items, justify the content to be in the center, takes the full height of the viewport
    >
      {/*Large text, with some title styling*/}
      <h1 className="text-7xl leading-1.2 font-semibold lato">MINO</h1>

      {/*Animation for on hover that I found online*/}
      <button
        onClick={handleGetStarted}
        className="m-8 text-blue rounded-lg hover:before:bg-blueborder-blue-500 relative h-[50px] w-40 overflow-hidden border border-blue-500 bg-white px-3 text-blue-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:text-white hover:shadow-blue-500 hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10">Swipe</span>
      </button>
    </motion.div>
  );
}

export default Welcome;
