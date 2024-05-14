
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';




export const CheckOffer = () => {

    const offers = useSelector(s => s.request.searchOffer);

    console.log(offers, "oferrrrrrrrrrrr")
    // const professions = useSelector(s => s.profession.profession);

    return (
        <>

            {/* {
                offers.map(r =>
                    <div>{r.pricePerVisit}{r.profession}</div>)
            } */}
            <h1> המערכת מצאה עבורך {offers.length} אפשרויות </h1>


            <DataTable value={offers} tableStyle={{ minWidth: '50rem' }}>
                <Column field="profession" header="Profession" ></Column>
                <Column field="days To workst" header="DaysToworks"></Column>
                <Column field="note" header="Note"></Column>
             .
                
            </DataTable>
                

        </>
    )
}

