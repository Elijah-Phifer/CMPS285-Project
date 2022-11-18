import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, Segment, Table } from "semantic-ui-react";
import { ApiResponse, SubscriberGetDto } from "../../constants/types";

export const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<SubscriberGetDto[]>();

  useEffect(() => {
    const fetchSubscribers = async () => {
      const response = await axios.get<ApiResponse<SubscriberGetDto[]>>(
        "api/subscriber"
      );
      if (response.data.hasErrors) {
        alert("Something went wrong!");
        return;
      }

      setSubscribers(response.data.data);
    };

    fetchSubscribers();
  }, []);
  return (
    <>
      {subscribers && (
        <Segment>
          <Header>Subscribers</Header>
          <Table>
            <Table.Header>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Date Subscribed</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {subscribers.map((subscriber) => {
                return (
                  <>
                    <Table.Cell>{subscriber.id}</Table.Cell>
                    <Table.Cell>{subscriber.name} </Table.Cell>
                    <Table.Cell>{subscriber.email}</Table.Cell>
                    <Table.Cell>{subscriber.dateSubscribed}</Table.Cell>
                  </>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
      )}
    </>
  );
};
