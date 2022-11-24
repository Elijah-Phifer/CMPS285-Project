import React from "react";
import {
  ApiResponse,
  UserCreateDto,
  UserDto,
  UserGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constants/ens-vars";
import { routes } from "../../routes/config";
import { Field, Form, Formik } from "formik";
import { Input } from "semantic-ui-react";

const initialValues: UserCreateDto = {
  id: 0,
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  email: "",
};

export const InventoriesCreatePage = () => {
  const history = useHistory();
  const onSubmit = async (values: UserCreateDto) => {
    const response = await axios.post<ApiResponse<UserGetDto>>(
      `${BaseUrl}/api/users`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.inventory.Inventory);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
          </div>
          <Field id="firstName" name="firstName">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="lastName">Last Name</label>
          </div>
          <Field id="lastName" name="lastName">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="userName">User Name</label>
          </div>
          <Field id="userName" name="userName">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="password">password</label>
          </div>
          <Field id="password" name="password">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="email">emailt</label>
          </div>
          <Field id="email" name="email">
            {({ field }) => <Input {...field} />}
          </Field>
        </Form>
      </Formik>
    </>
  );
};
