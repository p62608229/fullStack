import React from "react";
import Footer from "../app/Footer";
import { About } from "../components/home/About";
import { CommentsFlow } from "../components/comments/commentFlow";
import CommunityBanner from "../components/home/CommunityBanner";
import { ToRegisterFlow } from "../components/home/ToRegisterFlow";
import { useSelector } from "react-redux";
import "../css/home.css";

export function Home() {
    const currentUser = useSelector(s => s.users.currentUser);
    return (
        <div className="container">
            <CommunityBanner />
            {!currentUser && <ToRegisterFlow />}
            <About />
            <CommentsFlow />
            <Footer />
        </div>
    );
}
