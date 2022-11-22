/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "semantic-ui-react";
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
  const Click = async () => {
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

  return (
    <>
      {subscriber && (
        <Formik initialValues={subscriber} onSubmit={onSubmit}>
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
            <div></div>
            <br></br>
            <div className="ui large buttons">
              <Button className="ui button" type="submit">
                Update
              </Button>
              <div className="or"></div>
              <Button className="ui button" onClick={Click}>
                Delete
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};