/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "semantic-ui-react";
import {
  ApiResponse,
  SubscriberGetDto,
  SubscriberUpdateDto,
  SubscriberDeleteDto,
  SubscriberCreateDto,
} from "../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/ens-vars";
import { FormikBag } from "formik";
import { useStateWithHistory } from "react-use";
import { Routes } from "../../routes/config";
import { O_NOFOLLOW } from "constants";

export const SubscriberUpdatePage = () => {
  const history = useHistory();
  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const [subscriber, setSubscriber] = useState<SubscriberGetDto>();
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const response = await axios.get<ApiResponse<SubscriberGetDto>>(
        `/api/subscriber/${id}`
      );

      setSubscriber(response.data.data);
    };

    fetchSubscribers();
  }, [id]);

  const onSubmit = async (values: SubscriberUpdateDto) => {
    const response = await axios.put<ApiResponse<SubscriberGetDto>>(
      `/api/subscriber/${id}`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.Subscribers.listing);
    }
  };
  const Click1 = async () => {
    const response = await axios.delete<ApiResponse<SubscriberGetDto>>(
      `/api/subscriber/${id}`
    );
    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.Subscribers.listing);
    }
  };

  const Click2 = async () => {
    setOpen(false);
    history.push(routes.Subscribers.listing);
  };

  return (
    <>
      {subscriber && (
        <Formik initialValues={subscriber} onSubmit={onSubmit}>
          <Modal
            basic
            trigger={<Button color="grey"></Button>}
            as={Form}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={true}
          >
            <Modal.Header>Edit your inventory</Modal.Header>
            <Modal.Content>
              <Form>
                <div>
                  <label htmlFor="name">Name</label>
                </div>
                <Field id="name" name="name">
                  {({ field }) => <Input {...field} />}
                </Field>
                <div>
                  <label htmlFor="email">Email</label>
                </div>
                <Field id="email" name="email">
                  {({ field }) => <Input {...field} />}
                </Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button inverted color="green" type="submit">
                Submit
              </Button>
              <Button inverted color="orange" onClick={Click2}>
                Return
              </Button>
              <Button inverted color="red" onClick={Click1}>
                Delete?
              </Button>
            </Modal.Actions>
          </Modal>
        </Formik>
      )}
    </>
  );
};
