import { Outlet } from "react-router-dom"
import Footer from "../sections/Footer"
import Navbar from "../sections/Navbar"



const HomePageLayout = () => {
  return (
    <div>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default HomePageLayout