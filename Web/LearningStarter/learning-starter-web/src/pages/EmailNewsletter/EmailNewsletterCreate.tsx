/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
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
import { Button, Input, Modal } from "semantic-ui-react";
import { O_NOFOLLOW } from "constants";

const initialValues: EmailNewsletterCreateDto = {
  title: "",
  message: "",
  dateSent: new Date(),
};

export const EmailNewsletterCreatePage = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailNewsletters, setEmailNewsletters] =
    useState<EmailNewsletterGetDto[]>();

  const fetchEmailNewsletters = async () => {
    const response = await axios.get<ApiResponse<EmailNewsletterGetDto[]>>(
      "api/email-newsletter"
    );
    if (response.data.hasErrors) {
      alert("Something went wrong!");
      return;
    }

    setEmailNewsletters(response.data.data);
  };

  const onSubmit = async (values: EmailNewsletterCreateDto) => {
    const response = await axios.post<ApiResponse<EmailNewsletterGetDto>>(
      `${BaseUrl}/api/email-newsletter`,
      values,
      { validateStatus: () => true }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
      setSubmitLoading(false);
      return;
    }

    setOpen(false);
    history.push(routes.EmailNewsletters.listing);
    await fetchEmailNewsletters();
    setSubmitLoading(false);
  };

  const onClick = async () => {
    setOpen(false);
    history.push(routes.inventory.Inventory);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Modal
          basic
          trigger={<Button styles={{ backgroundColor: "#44444c" }}></Button>}
          as={Form}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={true}
        >
          <Modal.Header>Create an entry</Modal.Header>
          <Modal.Content>
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
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <div className="ui large buttons">
              <Button type="submit" className="ui btn thing-tsb-white">
                Save
              </Button>
              <Button type="button" className="ui btn-cancel" onClick={onClick}>
                Cancel
              </Button>
            </div>
          </Modal.Actions>
        </Modal>
      </Formik>
    </>
  );
};
