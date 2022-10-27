import axios from "axios";

import { Field, Form, Formik } from "formik";
import React from "react";
import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../../constants/ens-vars";
import { ApiResponse, BulletJournalEntryCreateDTO, BulletJournalEntryGetDTO } from "../../../constants/types";
import { useHistory } from 'react-router-dom';
import { routes } from "../../../routes/config";
import { Button, Input } from "semantic-ui-react";


const initialValues: BulletJournalEntryCreateDTO = {
    contents: " ",
    id: 0,
    //need to add date created
    isDone: false,
    pushes: 0
};



export const BulletJournalCreatePage = () =>   {
    const history = useHistory();

    const onSubmit = async (values:BulletJournalEntryCreateDTO) => {
        const response = await axios.post<ApiResponse<BulletJournalEntryGetDTO>>(
        `${BaseUrl}/api/BulletJournal`,
        values
        );

        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        }else {

            history.push(routes.home);

        }
    };

    return ( 
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <div>
                        <label htmlFor="contents">contents</label>
                    </div>
                    <Field id ='contents' contents='contents'>
                        {({ field }) => <Input {...field} />}
                    </Field>

                    <div>
                        <Button type="submit">Create</Button>
                    </div>
                </Form>
            </Formik>
    
        </>
    )
};

