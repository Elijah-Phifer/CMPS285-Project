import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../../../constants/ens-vars";

export const BulletJournalListingPage = () => {

    const fetchBulletJournal = async() => {
        const responde = await axios.get(`${BaseUrl}/api/BulletJournal`);
    }

    useEffect(() => {

        fetchBulletJournal();

    }, [])

    return <>
    
    </>
}