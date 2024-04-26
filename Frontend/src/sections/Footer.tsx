import { Facebook, Instagram, X } from "@mui/icons-material";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import {Link as LInk} from "react-scroll"

const Footer = () => {
  return (
    <div className=" footer w-full">
      <div className=" grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="logo">
          <img src={logo} alt="" className="h-32 invert w-50" />
        </div>
        <div className="navlinks text-white flex gap-7 flex-col lg:flex-row">
        <Link to={"/"}>
            <h1 className="text-md font-semibold hover:text-red-600 cursor-pointer">
              Home
            </h1>
          </Link>
          <LInk
            to="service"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <h1 className="text-md font-semibold hover:text-red-600 cursor-pointer">
              Services
            </h1>
          </LInk>
          {/* <h1 className="text-md font-semibold hover:text-red-600 cursor-pointer">
            Contact Us
          </h1> */}
          <LInk
            to="featured"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <h1 className="text-md font-semibold hover:text-red-600 cursor-pointer">
              Featured
            </h1>
          </LInk>
        </div>

        <div className="social-link flex gap-7 cursor-pointer flex-row">
          <Facebook style={{ color: "white", fontSize: "30px" }} />
          <Instagram style={{ color: "white", fontSize: "30px" }} />
          <X style={{ color: "white", fontSize: "30px" }} />
        </div>
      </div>
      <hr className="bg-gray-700 w-full my-4" />
      <p className="text-gray-400 text-center py-2"> &#169;copyright 2024</p>
    </div>
  );
};

export default Footer;
