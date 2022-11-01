import axios from "axios";
import { O_DIRECTORY } from "constants";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Header, Input, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/ens-vars";
import { ApiResponse, BulletJournalEntryGetDTO, BulletJournalEntryUpdateDTO } from "../../../constants/types";

const initialValues: BulletJournalEntryUpdateDTO = {
    id: 0,
    //need to add date created
    isDone: false,
    /*DateCreated: Now,*/
};

const onSubmit = async(values: BulletJournalEntryUpdateDTO) => {
    const response = await axios.post<ApiResponse<BulletJournalEntryGetDTO>>(
        `${BaseUrl}/api/BulletJournal`,
        values
        );

        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        }else {
            alert(JSON.stringify(values, null, 2));
                console.log(values); 
        }
}
export const BulletJournalListingPage = () => {
    const [bulletJournalEntries, setBulletJournalEntries] = useState<BulletJournalEntryGetDTO[]>();
    console.log(bulletJournalEntries);
    const fetchBulletJournal = async() => {
        const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO[]>>(`${BaseUrl}/api/BulletJournal`);
        if(response.data.hasErrors){
            alert("Something went wrong!");
            return;
            /*response.data.errors.forEach(err => {
                console.log(err.message);
            });*/
        }else{
            setBulletJournalEntries(response.data.data);
        }
    }

    useEffect(() => {

        fetchBulletJournal();

    }, [])

    return( 
        <>
        {bulletJournalEntries && (
        <>
            <h1>
                Bullet Journal
            </h1>
            <h2>
                Entries
            </h2>
            <div>
                {bulletJournalEntries.map(bulletJournalEntry => {
                    return(
                        <Segment>
                            <Table>
                                <Table.Header>
                                    <Table.HeaderCell>
                                        Id
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        isDone
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Contents
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Date Created
                                    </Table.HeaderCell>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Cell>
                                        {bulletJournalEntry.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Formik initialValues={initialValues} onSubmit={(onSubmit)}>
                                            <Form>
                                                <Field id ='isDone' name='isDone' type='input' class="ui fitted checkbox">
                                                    {({ field }) => <Input type="checkbox" name="isDone" {...field}/>}
                                                </Field>
                                            </Form>
                                        </Formik>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {bulletJournalEntry.contents}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {bulletJournalEntry.DateCreated}
                                    </Table.Cell>
                                </Table.Body>
                            </Table>
                        </Segment>
                    )
                })}
            </div>
        </>
        )}
        </>
    );
}