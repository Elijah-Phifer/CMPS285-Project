/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ApiResponse,
  EmailNewsletterGetDto,
  EmailNewsletterUpdateDto,
  EmailNewsletterDeleteDto,
} from "../../constants/types";
import { Button, Header, Segment, Table, TableRow } from "semantic-ui-react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { routes } from "../../routes/config";
import { Form, Formik } from "formik";

import "./email-listing.css";

export const EmailNewslettersPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emailNewsletters, setEmailNewsletters] =
    useState<EmailNewsletterGetDto[]>();

  const history = useHistory();

  useEffect(() => {
    const fetchEmailNewsletters = async () => {
      const response = await axios.get<ApiResponse<EmailNewsletterGetDto[]>>(
        "api/email-newsletter"
      );
      if (response.data.hasErrors) {
        alert("Something went wrong!");
        return;
      }

      setEmailNewsletters(response.data.data);
    };

    fetchEmailNewsletters();
  }, []);
  return (
    <>
      {emailNewsletters && (
        <Segment className="background">
          <Header className="thing-tsb-white">Email Newsletters</Header>
          <Table className="table-format">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Id
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Message
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Date Sent
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                ></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {emailNewsletters.map((emailNewsletter) => {
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{emailNewsletter.id}</Table.Cell>
                      <Table.Cell>{emailNewsletter.title} </Table.Cell>
                      <Table.Cell>{emailNewsletter.message}</Table.Cell>
                      <Table.Cell>{emailNewsletter.dateSent}</Table.Cell>
                      <Table.Cell>
                        <Button
                          className="ui icon button"
                          onClick={() =>
                            history.push(
                              routes.EmailNewsletters.update.replace(
                                ":id",
                                `${emailNewsletter.id}`
                              )
                            )
                          }
                        >
                          <i className="trash icon"></i>
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
