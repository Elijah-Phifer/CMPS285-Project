import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Icon, Input, Modal, Table } from "semantic-ui-react";
import {
  ApiResponse,
  BulletJournalEntryGetDTO,
  BulletJournalEntryUpdateDto,
} from "../../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/ens-vars";

export const BulletJournalUpdatePage = () => {
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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

  const onClick1 = async (values: BulletJournalEntryUpdateDto) => {
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

  const onClick2 = async () => {
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

  const onClick3 = async () => {
    setOpen(false);
    history.push(routes.bulletJournal.listing);
  };

  return (
    <>
      {bulletJournalEntries && (
        <Formik initialValues={bulletJournalEntries} onSubmit={onClick1}>
          <Modal
            basic
            trigger={<Button styles={{ backgroundColor: "#44444c" }}></Button>}
            as={Form}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={true}
          >
            <Modal.Header>Edit your entry</Modal.Header>
            <Modal.Content>
              <Form>
                {/*<div>
                  <label htmlFor="contents">Contents</label>
                </div>*/}
                <Field id="contents" name="contents" className="contents">
                  {({ field }) => (
                    <Input style={{ alignSelf: "center" }} {...field} />
                  )}
                </Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <span style={{ textAlign: "center" }}>
                <div className="ui large buttons center">
                  <Button center className="ui button" type="submit">
                    Update
                  </Button>

                  <Button className="ui button" onClick={onClick2}>
                    Delete
                  </Button>

                  <Button className="ui button" onClick={onClick3}>
                    Cancel
                  </Button>
                </div>
              </span>
            </Modal.Actions>
          </Modal>
        </Formik>
      )}
    </>
  );
};

/*export const BulletJournalDeletePage = () => {
  const history = useHistory();

  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;

  const [bulletJournalEntries, setBulletJournalEntries] =
    useState<BulletJournalEntryGetDTO>();

  /*const [bulletJournalEntriesOptions, setBulletJournalEntriesOptions] =
    useState<BulletJournalOptionsResponseDto>();
  

  useEffect(() => {
    const fetchBulletJournal = async () => {
      const response = await axios.get<ApiResponse<BulletJournalEntryGetDTO>>(
        `/api/BulletJournal/${id}`
      );

      setBulletJournalEntries(response.data.data);
    };

    fetchBulletJournal();
  }, [id]);

  const Click = async () => {
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
      bulletJournalEntries && (
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
      )
    </>
  );
};*/

/* <div>
              <label htmlFor="contents">Contents</label>
            </div>
            <Field id="contents" name="contents">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <Button type="submit">Submit</Button>
            </div> */
