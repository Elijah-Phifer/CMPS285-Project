import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input } from "semantic-ui-react";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
  BulletJournalEntryUpdateDTO,
} from "../../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

export const BulletJournalUpdatePage = () => {
  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO>();

  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO>>(
        `/api/BulletJournal/${id}`
      );

      if (response.data.hasErrors) {
        console.log(response.data.errors);
      }
      setBulletJournalEntries(response.data.data);
    };

    const fetchBulletJournalEntryOptions = async () => {
      const response = await axios.get<
        ApiResponse<BulletJournalEntryUpdateDTO>
      >(`/api/BulletJournal/${id}`);
    };

    fetchBulletJournal();
  }, [id]);

  return (
    <>
      {bulletJournalEntries && (
        <Formik initialValues={bulletJournalEntries} onSubmit={() => {}}>
          <Form>
            <div>
              <label htmlFor="contents">Contents</label>
            </div>
            <Field id="contents" name="contents">
              {({ feild }) => <Input {...feild} />}
            </Field>
            {/* <Dropdown
            selection
            multiple
            clearable
            placeholder="Bullet Journal Entry"
            options={{}}
      />*/}
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};
