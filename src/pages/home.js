import {  CommentsFlow } from "../components/comments/commentFlow";
import CommunityBanner from "../components/home/CommunityBanner";
import { ToRegisterFlow } from "../components/home/ToRegisterFlow";

export function Home() {
    return (<>
        <CommunityBanner />
        <ToRegisterFlow />
        <CommentsFlow />
    </>)
}