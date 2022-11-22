import axios from "axios";

import { Field, Form, Formik } from "formik";

import React, { useEffect, useState } from "react";

import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../../constants/ens-vars";
import {
  ApiResponse,
  BulletJournalEntryCreateDTO,
  BulletJournalEntryGetDTO,
} from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import {
  Button,
  Checkbox,
  Header,
  Input,
  Segment,
  Table,
  TableBody,
} from "semantic-ui-react";

import "./bullet-journal-create.css";

const initialValues: BulletJournalEntryCreateDTO = {
  contents: " ",
  id: 0,
  //need to add date created
  isDone: false,

  /*DateCreated: Now,*/

  DateCreated: new Date(),

  pushes: 0,
};

export const BulletJournalCreatePage = () => {
  const history = useHistory();

  const onSubmit = async (values: BulletJournalEntryCreateDTO) => {
    const response = await axios.post<ApiResponse<BulletJournalEntryGetDTO>>(
      `${BaseUrl}/api/BulletJournal`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      /* alert(JSON.stringify(values, null, 2));
                console.log(values); */

      history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="input-label">
            <label htmlFor="contents">What do you have to do?</label>
          </div>
          {/* <span>
                    <Field id ='isDone' name='isDone' type='input' class="ui fitted checkbox">
                        {({ field }) => <Input type="checkbox" name="isDone" {...field}/>}
                    </Field>
                    
                    </span>
                    */}
          <Field
            id="contents"
            name="contents"
            type="input"
            placeholder="Do Something"
          >
            {({ field }) => <Input className="ui fluid input" {...field} />}
          </Field>
          <div>
            <Button type="submit" className="ui fluid btn">
              Save
            </Button>
          </div>
          <div>
            <Button
              className="ui fluid btn-cancel"
              onClick={() => history.push(routes.bulletJournal.listing)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

//Listings at bottom to fill up the screen, ASTHETICS

export const BulletJournalCreateListing = () => {
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

  //try going in back end and make controller for mark-done

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

  //possibly animate button to change what it says when hovered over

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
                    <Table.Cell>{bulletJournalEntry.DateCreated}</Table.Cell>
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
