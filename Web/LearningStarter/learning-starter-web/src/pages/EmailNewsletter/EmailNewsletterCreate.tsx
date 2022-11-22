/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { Field, Form, Formik } from "formik";
import React from "react";
import { useStateWithHistory } from "react-use";

import { BaseUrl } from "../../constants/ens-vars";
import {
  ApiResponse,
  EmailNewsletterCreateDto,
  EmailNewsletterGetDto,
  EmailNewsletterUpdateDto,
  EmailNewsletterDeleteDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes, Routes } from "../../routes/config";
import { Button, Input } from "semantic-ui-react";
import { O_NOFOLLOW } from "constants";

const initialValues: EmailNewsletterCreateDto = {
  title: "",
  message: "",
  dateSent: new Date(),
};

export const EmailNewsletterCreatePage = () => {
  const history = useHistory();

  const onSubmit = async (values: EmailNewsletterCreateDto) => {
    const response = await axios.post<ApiResponse<EmailNewsletterGetDto>>(
      `${BaseUrl}/api/email-newsletter`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.EmailNewsletters.listing);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="title">Title</label>
          </div>
          <Field id="title" name="title">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="message">Message</label>
          </div>
          <Field id="message" name="message">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};