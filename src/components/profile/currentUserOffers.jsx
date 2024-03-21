import { useDispatch, useSelector } from "react-redux"
import { CommentsTable } from "../comments/commentsTabel";
import { useEffect } from "react";
import { getAllCurrentUserOffers } from "../../Redux/API/offer";

export const CurrentUserOffers = () => {

    const offers = useSelector(s => s.offer.currentUserOffers);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCurrentUserOffers())
    })

    return <>
    CurrentUser of
    </>

}
