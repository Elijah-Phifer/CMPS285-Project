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
  id: 0,
  itemName: "",
  productionCost: "",
  quantity: "",
  availabilty: "",
  onlineStoreId: "",
  siteListing: "",
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
      history.push(routes.inventory.Inventory);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="itemName">Item Name</label>
          </div>
          <Field id="itemName" name="itemName">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="productionCost">production Cost</label>
          </div>
          <Field id="productionCost" name="productionCost">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="quantity">Quantity</label>
          </div>
          <Field id="quantity" name="quantity">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="availabilty">availabilty</label>
          </div>
          <Field id="availabilty" name="availabilty">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="onlineStoreId">Store Listed at</label>
          </div>
          <Field id="onlineStoreId" name="onlineStoreId">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="siteListing">Site Listing</label>
          </div>
          <Field id="siteListing" name="siteListing">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="dateAdded">Date Added</label>
          </div>
          <Field id="dateAdded" name="dateAdded">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <br></br>
            <Button
              inverted
              color="orange"
              onClick={() => {
                history.push(routes.inventory.Inventory);
              }}
            >
              Return
            </Button>
            <Button inverted color="green" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
