import Footer from "../app/Footer";
import {  CommentsFlow } from "../components/comments/commentFlow";
import CommunityBanner from "../components/home/CommunityBanner";
import { HowItWorks } from "../components/home/HowItWorks";
import { ToRegisterFlow } from "../components/home/ToRegisterFlow";
import { useSelector } from "react-redux";


export function Home() {

    const currentUser = useSelector(s => s.users.currentUser);
    return (<>
        <CommunityBanner />
        {!currentUser &&  <ToRegisterFlow /> }
        <HowItWorks />
        <CommentsFlow />
        <Footer />
    </>)
}