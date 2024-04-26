import {motion} from "framer-motion"
interface props{
  logo: any;
  heading: string;
  description: string;
}

const ServiceCard = (prop: props) => {
  const {logo, heading, description} = prop;
  return (
    <motion.div initial={{bottom: -100}} whileInView={{bottom: 0}} transition={{duration: 2}} className='h-[254px] w-[190px] rounded-xl service-card p-2'>
       <img src={logo} alt={description} className="w-28 h-28 mx-auto"/>
          <h3 className="font-bold text-xl text-center">{heading}</h3>
          <p className="text-gray-500 text-center text-sm my-3">{description}</p>
    </motion.div>
  )
}

export default ServiceCard