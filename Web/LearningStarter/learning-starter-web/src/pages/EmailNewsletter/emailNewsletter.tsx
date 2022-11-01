import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiResponse, EmailNewsletterGetDto } from "../../constants/types";


export const EmailNewslettersPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [emailNewsletters, setEmailNewsletters] = useState<EmailNewsletterGetDto[]>();

    useEffect(() => {
        const fetchEmailNewsletters = async () => {
            const response = await axios.get<ApiResponse<EmailNewsletterGetDto[]>>('api/email-newsletter');
            if (response.data.hasErrors){
                alert("Something went wrong!");
                return;
            }

            setEmailNewsletters(response.data.data);
        };

        fetchEmailNewsletters();
    }, []);
    return(
        <>
        <h1>
            Email Newsletters
        </h1>
        <div>
            
        </div>
        </>
    )
}
