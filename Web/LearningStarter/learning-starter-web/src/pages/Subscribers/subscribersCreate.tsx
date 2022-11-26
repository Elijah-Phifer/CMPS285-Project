/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { Field, Form, Formik } from "formik";
import React from "react";
import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../constants/ens-vars";
import {
  ApiResponse,
  SubscriberCreateDto,
  SubscriberGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes, Routes } from "../../routes/config";
import { Button, Input } from "semantic-ui-react";
import { O_NOFOLLOW } from "constants";

const initialValues: SubscriberCreateDto = {
  name: "",
  email: "",
  dateSubscribed: new Date(),
};

export const SubscriberCreatePage = () => {
  const history = useHistory();

  const onSubmit = async (values: SubscriberCreateDto) => {
    const response = await axios.post<ApiResponse<SubscriberGetDto>>(
      `${BaseUrl}/api/subscriber`,
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

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
              Create
            </Button>
            <div className="or"></div>
            <Button
              className="ui button"
              type="submit"
              onClick={() => {
                history.push(routes.Subscribers.listing);
              }}>
              Cancel
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
