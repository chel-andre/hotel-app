import heroImage from "../assets/woman.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex mx-8 my-3 p-8 bg-cream rounded-md justify-between flex-col items-center md:flex-row border-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, type: "spring" }}
        className=" flex flex-col justify-center items-center  p-4 rounded-xl"
      >
        <h5 className="text-xl  font-bold text-orange-700 text-center">
          Best destinations around the world
        </h5>
        <h1 className="my-1 text-white text-5xl font-extrabold text-center">
          Travel, Enjoy
        </h1>
        <h1 className="my-1 text-white text-5xl font-extrabold text-center">
          and Live a New
        </h1>
        <h1 className="my-1 text-white text-5xl font-extrabold text-center">
          and Full Life
        </h1>
      </motion.div>

      <motion.div
        initial={{ right: -100 }}
        animate={{ right: 0 }}
        transition={{ duration: 2, type: "spring" }}
        className="image-container relative"
      >
        <img
          src={heroImage}
          alt="hotel image"
          className="h-[400px] w-[400px] p5"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
