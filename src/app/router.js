import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Menu } from "../components/menu/menu"
import { About } from "../pages/about"
import { Request } from "../pages/request"
import { Offer } from "../pages/offer"
import { SendEmail } from "../pages/sendEmail/sendEmail"
import { CommentPage } from "../pages/commentPage"
import { CheckReq } from "../pages/checkreq"
import { Addcomment } from "../components/comments/addComment"
import { UserCalendar } from "../pages/calendar"
import { CurrentUserComments } from "../components/profile/currentUserComments"
import { Profile } from "../components/profile/profile"
import { EditProfile } from "../components/profile/editProfile"
import { ProfileMenu } from "../components/profile/profileMenu"
import { CurrentUserOffers } from "../components/profile/currentUserOffers"
import { CurrentUserRequests } from "../components/profile/currentUserRequests"
import { Login } from "../pages/login"
import { Register } from "../pages/register"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Menu />}>
                    <Route path='' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='about' element={<About />} />
                    <Route path='request' element={<Request />} />
                    <Route path="profile" element={<ProfileMenu />}>
                        <Route path="" element={<Profile />} />
                        <Route path="edit" element={<EditProfile />} />
                        <Route path="offers" element={<CurrentUserOffers />} />
                        <Route path="requests" element={<CurrentUserRequests />} />
                        <Route path="comments" element={<CurrentUserComments />} />
                        <Route path="calendar" element={<UserCalendar />} />
                    </Route>
                    <Route path='offer' element={<Offer />} />
                    <Route path="sendEmail" element={<SendEmail />} />
                    <Route path="comments" >
                        <Route path="" element={<CommentPage />} />
                        <Route path="new" element={<Addcomment />} />
                    </Route>
                    <Route path="calendar" element={<UserCalendar />} />
                    <Route path="checkreq" element={<CheckReq />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
