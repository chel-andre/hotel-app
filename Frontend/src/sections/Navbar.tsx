import { AccountCircle, Menu } from "@mui/icons-material";
import logo from "../assets/logo1.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout, userState } from "../redux/userReducer";
import { Link } from "react-router-dom";
import UserSvc from "../services/userService";
import { toast } from "react-toastify";
import { Link as LInk } from "react-scroll";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const drawerRef = useRef<HTMLDivElement>(null);


  const user: userState = useSelector((state: RootState) => {
    return state.user;
  });
  const { loggedIn, firstName } = user.loggedInUser;

  const handleLogOut = async () => {
    try {
      dispatch(logout());
      const response = await UserSvc.logOut();
      localStorage.clear();
      toast.success(response?.data.message);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="bg-blue-800 text-white">
      <div className="flex items-center mx-8 sm:justify-between md:gap-5 lg:gap-10">
        <div className="logo-right">
          <Link to={"/"}>
            <img src={logo} alt="" className="h-24 invert  w-36" />
          </Link>
        </div>
        <div className="hidden lg:flex center text-lg text-white justify-center gap-9 items-center">
          <Link to={"/"}>
            <h1 className="text-lg font-semibold hover:text-red-600 cursor-pointer">
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
            <h1 className="text-md font-semibold hover:text-red-600 cursor-pointer" id="Featured">
              Featured
            </h1>
          </LInk>
        </div>
        <div className="button-left hidden lg:flex gap-3 items-center">
          {loggedIn ? (
            <>
              <p className="relative cursor-pointer text-xl" id="name">
                <AccountCircle />
                {firstName ? firstName : "user"}
              </p>
              <Link to={"/booking"}>
                <button className="cursor-pointer  text-white p-2 rounded-lg bg-blue-600 hover:bg-blue-700 hover:shadow-xl transition-all ease-in-out" id="My-Bookings">
                  My Bookings
                </button>
              </Link>

              <button
                className="bg-red-600 text-white p-2 rounded-lg" id="LogOut"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogOut();
                }}
              >
                LogOut
              </button>
            </>
          ) : (
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="cursor-pointer w-36 h-12 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 hover:shadow-xl transition-all ease-in-out" id="Login">
                Login
              </button>
            </Link>
          )}
        </div>
        <button
          className="lg:hidden absolute right-8"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Menu style={{ fontSize: "35px", color: "black" }} />
        </button>
      </div>

      {/*------------------------- mobile navbar ---------------*/}

      <div
      ref={drawerRef}
        className={`flex w-1/2 flex-col gap-4 top-0 bg-gray-200 z-50 p-10 items-center text-black absolute h-full ${
          open ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-700`}
      >
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
  
        {loggedIn ? (
          <>
            <p className="relative cursor-pointer">
              <AccountCircle />
              {firstName ? firstName : "user"}
            </p>
            <Link to={"/booking"}>
              <button className="cursor-pointer w-24 h-12 bg-blue-600 text-white text-xs rounded-3xl hover:bg-blue-700 hover:shadow-xl transition-all ease-in-out">
                My Bookings
              </button>
            </Link>

            <button
              className="bg-red-600 text-white p-2 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleLogOut();
              }}
            >
              LogOut
            </button>
          </>
        ) : (
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="cursor-pointer w-36 h-12 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 hover:shadow-xl transition-all ease-in-out">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
