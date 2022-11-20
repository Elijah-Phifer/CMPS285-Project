/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "semantic-ui-react";
import {
  ApiResponse,
  EmailNewsletterGetDto,
  EmailNewsletterUpdateDto,
  EmailNewsletterDeleteDto,
} from "../../constants/types";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/ens-vars";
import { FormikBag } from "formik";

export const EmailNewsletterUpdatePage = () => {
  const history = useHistory;
  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const [emailNewsletter, setEmailNewsletter] =
    useState<EmailNewsletterGetDto>();

  useEffect(() => {
    const fetchEmailNewsletters = async () => {
      const response = await axios.get<ApiResponse<EmailNewsletterGetDto>>(
        `/api/email-newsletter/${id}`
      );

      setEmailNewsletter(response.data.data);
    };

    fetchEmailNewsletters();
  }, [id]);

  const onSubmit = async (values: EmailNewsletterUpdateDto) => {
    const response = await axios.put<ApiResponse<EmailNewsletterGetDto>>(
      `/api/email-newsletter/${id}`,
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

  const Click = async () => {
    const response = await axios.delete<ApiResponse<EmailNewsletterGetDto>>(
      `/api/email-newsletter/${id}`
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
      {emailNewsletter && (
        <Formik initialValues={emailNewsletter} onSubmit={onSubmit}>
          <Form>
            <div>
              <label htmlFor="id">Id</label>
            </div>
            <Field id="id" name="id">
              {({ field }) => <Input {...field} />}
            </Field>
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
            <div></div>
            <br></br>
            <div className="ui large buttons">
              <Button
                className="ui button"
                onClick={() => {
                  history.push(routes.EmailNewsletters.listing);
                }}>
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
