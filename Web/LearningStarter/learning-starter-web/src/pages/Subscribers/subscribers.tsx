import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Segment, Table } from 'semantic-ui-react';
import { ApiResponse, SubscriberGetDto } from '../../constants/types'

export const SubscribersPage = () => {
    const [subscribers, setSubscribers] = useState<SubscriberGetDto[]>();

    useEffect(() => {
        const fetchSubscribers = async () => {
            const response = await axios.get<ApiResponse<SubscriberGetDto[]>>('api/subscribers');
            if (response.data.hasErrors){
                alert("Something went wrong!");
                return;
            }

            setSubscribers(response.data.data);

        };

        fetchSubscribers();

    }, []);
    return(
        <>
        {subscribers && (
        <>
        <h1>
            Subscribers
        </h1>
        <div>
            {subscribers.map(subscriber => {
                return (
                    <Segment>
                        <Table>
                            <Table.Header>
                                <Table.HeaderCell>
                                    Id
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Email
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Date Subscribed
                                </Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                        <Table.Cell>
                            {subscriber.id}
                        </Table.Cell>
                        <Table.Cell>
                            {subscriber.name} 
                        </Table.Cell>
                        <Table.Cell>
                            {subscriber.email}
                        </Table.Cell>
                        <Table.Cell>
                            {subscriber.dateSubscribed}
                        </Table.Cell>
                        </Table.Body>
                        </Table>
                        </Segment>

                )
            })}
        </div>

        <div className="ui icon input loading" id="abId0.14781943156262267">
        <input type="text" placeholder="Search..." spellCheck="false" data-ms-editor="true"/>
        <i className="search icon"></i>
        </div>
    
        </>
        )}
        </>

    )

        }   
                
            

            

        
        

