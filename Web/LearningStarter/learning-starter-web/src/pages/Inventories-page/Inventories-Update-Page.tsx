import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "semantic-ui-react";
import {
  ApiResponse,
  InventoriesUpdateDto,
  InventoriesGetDto,
} from "../../constants/types";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";

export const InventoriesUpdatePage = () => {
  let match = useRouteMatch<{ id: number }>();
  const id = match.params.id;
  const history = useHistory();
  const [inventories, setInventories] = useState<InventoriesGetDto>();

  useEffect(() => {
    const fetchInvetories = async () => {
      const response = await axios.get<ApiResponse<InventoriesGetDto>>(
        `/api/Inventories/${id}`
      );

      setInventories(response.data.data);
    };

    fetchInvetories();
  }, []);

  const onSubmit = async (values: InventoriesUpdateDto) => {
    const response = await axios.put<ApiResponse<InventoriesGetDto>>(
      `/api/Inventories/${id}`,
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
      {inventories && (
        <Formik initialValues={inventories} onSubmit={onSubmit}>
          <Form>
            {/* <div>
              <Label>Item Name</Label>
            </div> 

            <Field id="itemName" name="itemName">
              {({ field }) => <Input {...field} />}
            </Field> */}
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
              <label htmlFor="onlineStoreId">onlineStoreId</label>
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
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};
