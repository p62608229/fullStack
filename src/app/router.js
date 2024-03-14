import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Menu } from "../components/menu/menu"
import { Login } from "../pages/login"
import { About } from "../pages/about"
import { Register } from "../pages/register"
import { Request } from "../pages/request"
import { Offer } from "../pages/offer"
import { SendEmail } from "../pages/sendEmail/sendEmail"
import { CommentPage } from "../components/comments/commentPage"
import { CheckReq } from "../pages/checkreq"
import { ShowAllComments } from "../pages/comments/showAllComments"
import { Addcomment } from "../pages/comments/addComment"
import Profile from "../pages/profile"
import { UserCalendar } from "../pages/calendar"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Menu />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/request' element={<Request />} />
                    <Route path='' element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path='offer' element={<Offer />} />
                    <Route path="sendEmail" element={<SendEmail />} />
                    {/* <Route path="/commentsPage" element={<CommentPage />} /> */}
                    <Route path="comments" >
                        <Route path="" element={<ShowAllComments />} />
                        <Route path="new" element={<Addcomment />} />
                    </Route>
                    <Route path="calendar" element={<UserCalendar />} />
                    <Route path="checkreq" element={<CheckReq />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
