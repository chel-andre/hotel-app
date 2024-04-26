import { ToastContainer } from "react-toastify"
import RouteComponent from "./routes/RouteComponent"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/userReducer";


function App() {
  const dispatch = useDispatch();
  const getLoggedInUser = async()=>{
   dispatch(getUser() as any);
  }
  useEffect(() => {
    getLoggedInUser();
    
  },[dispatch])
  return (
    <div>
      <ToastContainer autoClose={1000}/>
      <RouteComponent/>
      
    </div>
  )
}

export default App
