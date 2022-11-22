/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { O_DIRECTORY } from "constants";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Header,
  Input,
  List,
  Segment,
  Tab,
  Table,
  TableBody,
  TableHeader,
} from "semantic-ui-react";
import { BaseUrl } from "../../../constants/ens-vars";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
} from "../../../constants/types";

import "./Bullet-Journal-listing-page.css";

import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

export const BulletJournalListingPage = () => {
  const history = useHistory();
  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO[]>();

  console.log(bulletJournalEntries);
  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO[]>>(
        `${BaseUrl}/api/BulletJournal`
      );
      if (response.data.hasErrors) {
        alert("Something went wrong!");
        return;
        /*response.data.errors.forEach(err => {
                console.log(err.message);
            });*/
      }
      setBulletJournalEntries(response.data.data);
    };

    fetchBulletJournal();
  }, []);

  const markBulletJournalEntryAsDone = async (id: number, isDone: Boolean) => {
    console.log("debug", { isDone });
    const response = await axios.put(
      `${BaseUrl}/api/BulletJournal/mark-done/${id}`,
      isDone,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    }
  };

  //try going in back end and make controller for mark-done

  //possibly animate button to change what it says when hovered over

  return (
    <>
      {bulletJournalEntries && (
        <Segment className="background">
          <div>
            <span>
              <Input
                type="text"
                placeholder="Search..."
                className="ui right input"
              ></Input>
            </span>
          </div>
          <Header className="thing-tsb-white">Entries</Header>
          <div>
            <Button
              className="ui fluid button thing-tsb-white"
              onClick={() => history.push(routes.bulletJournal.create)}
            >
              Create An Entry
            </Button>
          </div>
          <Table className="table-format">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "#44444c" }}
                >
                  Id
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "#44444c" }}
                >
                  isDone
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "#44444c" }}
                >
                  Contents
                </Table.HeaderCell>
                {/* <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Date Created
      </Table.HeaderCell> */}
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c" }}
                ></Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c" }}
                ></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {bulletJournalEntries.map((bulletJournalEntry) => (
                <Table.Row key={bulletJournalEntry.id}>
                  <Table.Cell style={{ color: "#44444c" }}>
                    {bulletJournalEntry.id}
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      name="isDone"
                      className="ui radio checkbox"
                      defaultChecked={bulletJournalEntry.isDone}
                      onChange={(e, data) =>
                        markBulletJournalEntryAsDone(
                          bulletJournalEntry.id,
                          data.checked ?? false
                        )
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>{bulletJournalEntry.contents}</Table.Cell>
                  {/*<Table.Cell>{bulletJournalEntry.DateCreated}</Table.Cell>*/}
                  <Table.Cell>
                    <Button
                      className="ui icon button"
                      onClick={() =>
                        history.push(
                          routes.bulletJournal.update.replace(
                            ":id",
                            `${bulletJournalEntry.id}`
                          )
                        )
                      }
                    >
                      <i className="pencil icon"></i>
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      className="ui icon button"
                      onClick={() =>
                        history.push(
                          routes.bulletJournal.delete.replace(
                            ":id",
                            `${bulletJournalEntry.id}`
                          )
                        )
                      }
                    >
                      <i className="eraser icon"></i>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </TableBody>
          </Table>
        </Segment>
      )}
    </>
  );
};
