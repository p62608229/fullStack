import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Menu } from "../components/menu/menu"
import { Login } from "../pages/login"
import { About } from "../pages/about"
import { Register } from "../pages/register"
import { HomeUser } from "../pages/homeUser"
import { Request } from "../pages/request"
import { Offer } from "../pages/offer"
import { SendEmail } from "../pages/sendEmail/sendEmail"
import { AddComment } from "../pages/addComment"
import { Calendar, UserCalendar } from "../pages/calendar"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Menu />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/homeUser' element={<HomeUser />} />
                    <Route path='/request' element={<Request />} />
                    <Route path='/offer' element={<Offer />} />
                    <Route path='/calendar' element={<UserCalendar />} />
                    <Route path="/sendEmail" element={<SendEmail />} />
                    <Route path="/addComment" element={<AddComment />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
