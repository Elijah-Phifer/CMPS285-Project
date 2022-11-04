import React from "react";
import { Field, Form, Formik } from "formik";
import { Button, Input } from "semantic-ui-react";
import {
  ApiResponse,
  InventoriesCreateDto,
  InventoriesGetDto,
} from "../../constants/types";
import axios from "axios";
import { BaseUrl } from "../../constants/ens-vars";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";

const initialValues: InventoriesCreateDto = {
  itemName: "",
  productionCost: 0,
  quantity: 0,
  availabilty: "",
  onlineStoreId: 0,
  siteListing: 0,
  dateAdded: "",
};

export const InventoriesCreatePage = () => {
  const history = useHistory();
  const onSubmit = async (values: InventoriesCreateDto) => {
    const response = await axios.post<ApiResponse<InventoriesGetDto>>(
      `${BaseUrl}/api/Inventories`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.inventory);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="itemName">Item Name</label>
          </div>
          <Field
            id="itemName"
            itemName="itemName"
            productionCost="production Cost"
            quantity="quantity"
            availabilty="availabilty"
            onlineStoreId="onlineStoreId"
            siteListing="siteListing"
            dateAdded="dateAdded"
          >
            {({ Field }) => <Input {...Field} />}
          </Field>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
