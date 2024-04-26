import {  Suspense, lazy} from "react";
import {motion} from "framer-motion"
import flight from "../assets/airplane.png";
import radar from "../assets/radar.png";
import mike from "../assets/mike.png";
import setting from "../assets/setting.png";
import Loader from "../components/loader/Loader";


const ServiceCard = lazy(() => {
  return import("../components/ServiceCard");
});



const Service = () => {
  return (
    <div className="my-28 mx-auto w-[80%]" id="service">
      <h1 className="text-center text-5xl font-extrabold text-blue-900">
        We offer best services!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center	 gap-10 my-20">
        <Suspense
          fallback={
            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 5}} className="h-[20vh] flex justify-center items-center">
              <Loader />
            </motion.div>
          }
        >
          <ServiceCard
            logo={flight}
            heading={"Best Flight"}
            description={
              "We offer superior flight services for unparalleled travel experiences"
            }
          />
          <ServiceCard
            logo={radar}
            heading={"Calculated weather"}
            description={
              "We provide accurate travel weather updates for your journey."
            }
          />
          <ServiceCard
            logo={mike}
            heading={"Local events"}
            description={
              "We offer exciting local events for your entertainment pleasure."
            }
          />
          <ServiceCard
            logo={setting}
            heading={"Customizations"}
            description={
              "We specialize in personalized travel experiences with tailored customization options."
            }
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Service;
