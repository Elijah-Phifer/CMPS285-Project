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
} from "semantic-ui-react";
import { BaseUrl } from "../../../constants/ens-vars";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
} from "../../../constants/types";

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
        <Segment>
          <div>
            <span>
              <Input
                type="text"
                placeholder="Search..."
                className="ui right input"
              ></Input>
            </span>
          </div>
          <Header>Entries</Header>
          <div>
            <Button
              className="ui fluid button"
              onClick={() => history.push(routes.bulletJournal.create)}
            >
              Create An Entry
            </Button>
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>isDone</Table.HeaderCell>
                <Table.HeaderCell>Contents</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {bulletJournalEntries.map((bulletJournalEntry) => {
                return (
                  <Table.Row key={bulletJournalEntry.id}>
                    <Table.Cell>{bulletJournalEntry.id}</Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        name="isDone"
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
                    <Table.Cell>{bulletJournalEntry.DateCreated}</Table.Cell>
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
                );
              })}
            </TableBody>
          </Table>
        </Segment>
      )}
    </>
  );
};
