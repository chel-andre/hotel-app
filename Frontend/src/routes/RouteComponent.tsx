import { BrowserRouter, Route, Routes} from "react-router-dom"
import HomePageLayout from "../layouts/HomePageLayout"
import IndexPage from "../pages/IndexPage"
import AdminPageLayout from "../layouts/AdminPageLayout"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import SearchPage from "../pages/SearchPage"
import Authenticator from "../middelwares/Authenticator"
import BookingListingPage from "../pages/BookingListingPage"
import NotFoundPage from "../pages/NotFoundPage"
import HotelDescription from "../pages/HotelDescription"
import BookingCreatingPage from "../pages/BookingCreatingPage"
import BookingUpdatingPage from "../pages/BookingUpdatingPage"


const RouteComponent = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage/>}/>
          <Route path="/" element={<HomePageLayout/>}>
            <Route index element={<IndexPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="search" element={<SearchPage/>}/>
            <Route path="booking" element={<Authenticator component={<BookingListingPage/>}/>}></Route>
            <Route path="hotel/:id" element={<HotelDescription/>}/>
            <Route path="booking/create" element={<Authenticator component={<BookingCreatingPage/>}/>}/>
            <Route path="booking/update/:id" element={<Authenticator component={<BookingUpdatingPage/>}/>}/>
          </Route>
          <Route path="/admin" element={<AdminPageLayout/>}>
            <Route index element={<HomePageLayout/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default RouteComponent;