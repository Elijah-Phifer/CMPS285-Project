import axios from "axios";
import { O_DIRECTORY } from "constants";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Header,
  Input,
  Segment,
  Tab,
  Table,
  TableBody,
} from "semantic-ui-react";
import { BaseUrl } from "../../../constants/ens-vars";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
  BulletJournalEntryUpdateDTO,
} from "../../../constants/types";

const initialValues: BulletJournalEntryUpdateDTO = {
  id: 0,
  //need to add date created
  isDone: false,
  _DateCreated: {
    get DateCreated() {
      return this._DateCreated;
    },
    set DateCreated(value) {
      this._DateCreated = value;
    },
  },
};

const onSubmit = async (values: BulletJournalEntryUpdateDTO) => {
  const response = await axios.post<ApiResponse<BulletJournalEntryGetDTO>>(
    `${BaseUrl}/api/BulletJournal`,
    values
  );

  if (response.data.hasErrors) {
    response.data.errors.forEach((err) => {
      console.log(err.message);
    });
  } else {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
  }
};
export const BulletJournalListingPage = () => {
  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO[]>();
  console.log(bulletJournalEntries);
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
    } else {
      setBulletJournalEntries(response.data.data);
    }
  };

  useEffect(() => {
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

  return (
    <>
      {bulletJournalEntries && (
        <Segment>
          <Header>Entries</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>isDone</Table.HeaderCell>
                <Table.HeaderCell>Contents</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
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
                    <Table.Cell>{bulletJournalEntry._DateCreated}</Table.Cell>
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
