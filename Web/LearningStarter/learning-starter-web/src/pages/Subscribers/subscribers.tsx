import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiResponse, SubscriberGetDto } from "../../constants/types";
import { Button, Header, Segment, Table, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";

export const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<SubscriberGetDto[]>();

  const history = useHistory();

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
          <div>
            <span>
              <Input
                type="text"
                placeholder="Search Subscribers..."
                className="ui left icon input loading"
                id="abId0.6393624643593341"></Input>
            </span>
          </div>
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
                    <Table.Row>
                      <Table.Cell>{subscriber.id}</Table.Cell>
                      <Table.Cell>{subscriber.name} </Table.Cell>
                      <Table.Cell>{subscriber.email}</Table.Cell>
                      <Table.Cell>{subscriber.dateSubscribed}</Table.Cell>
                      <Table.Cell>
                        <Button
                          className="ui icon button"
                          onClick={() =>
                            history.push(
                              routes.Subscribers.update.replace(
                                ":id",
                                `${subscriber.id}`
                              )
                            )
                          }>
                          <i className="pencil alternate icon"></i>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
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
