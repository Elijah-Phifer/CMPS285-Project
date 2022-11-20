import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Table } from "semantic-ui-react";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
  BulletJournalEntryUpdateDto,
} from "../../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/ens-vars";

export const BulletJournalUpdatePage = () => {
  const history = useHistory();

  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO>();

  /*const [bulletJournalEntriesOptions, setBulletJournalEntriesOptions] =
    useState<BulletJournalOptionsResponseDto>();
  */

  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO>>(
        `/api/BulletJournal/${id}`
      );

      setBulletJournalEntries(response.data.data);
    };

    fetchBulletJournal();
  }, []);

  const onSubmit = async (values: BulletJournalEntryUpdateDto) => {
    const response = await axios.put<ApiResponse<BulletJournalEntryGetDTO>>(
      `/api/BulletJournal/${id}`,
      values //values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }
  };

  return (
    <>
      {bulletJournalEntries && (
        <Formik initialValues={bulletJournalEntries} onSubmit={onSubmit}>
          <Form>
            <div>
              <label htmlFor="contents">Contents</label>
            </div>
            <Field id="contents" name="contents">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export const BulletJournalDeletePage = () => {
  const history = useHistory();

  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO>();

  /*const [bulletJournalEntriesOptions, setBulletJournalEntriesOptions] =
    useState<BulletJournalOptionsResponseDto>();
  */

  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO>>(
        `/api/BulletJournal/${id}`
      );

      setBulletJournalEntries(response.data.data);
    };

    fetchBulletJournal();
  }, [id]);

  const onSubmit1 = async () => {
    const response = await axios.delete<ApiResponse<BulletJournalEntryGetDTO>>(
      `/api/BulletJournal/${id}`
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.bulletJournal.listing); //probably needs to go to listing page
    }
  };

  return (
    <>
      {bulletJournalEntries && (
        <Formik initialValues={bulletJournalEntries} onSubmit={onSubmit1}>
          <Form>
            <Table.Cell>
              <Button type="submit">Delete</Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => history.push(routes.bulletJournal.listing)}
              >
                Cancel
              </Button>
            </Table.Cell>
          </Form>
        </Formik>
      )}
    </>
  );
};

/* <div>
              <label htmlFor="contents">Contents</label>
            </div>
            <Field id="contents" name="contents">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <Button type="submit">Submit</Button>
            </div> */
