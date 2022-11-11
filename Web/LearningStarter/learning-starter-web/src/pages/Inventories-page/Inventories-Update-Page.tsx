import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "semantic-ui-react";
import {
  ApiResponse,
  InventoriesCreateDto,
  InventoriesGetDto,
} from "../../constants/types";
import { useRouteMatch } from "react-router-dom";
import { BaseUrl } from "../../constants/ens-vars";

export const InventoriesUpdatePage = () => {
  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const [inventories, setInventories] = useState<InventoriesGetDto>();

  const onSubmit = async (values: InventoriesGetDto) => {
    const response = await axios.post<ApiResponse<InventoriesGetDto>>(
      `${BaseUrl}/api/Inventories`,
      values
    );
  };

  useEffect(() => {
    const fetchInvetories = async () => {
      const response = await axios.get<ApiResponse<InventoriesGetDto>>(
        `/api/Inventories/${id}`
      );

      setInventories(response.data.data);
    };
    fetchInvetories();
  }, [id]);
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
            <Field id="${id}" name="itemName">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <label htmlFor="productionCost">production Cost</label>
            </div>
            <Field id="${id}" name="productionCost">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <label htmlFor="quantity">Quantity</label>
            </div>
            <Field id="${id}" name="quantity">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <label htmlFor="availabilty">availabilty</label>
            </div>
            <Field id="${id}" name="availabilty">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <label htmlFor="onlineStoreId">onlineStoreId</label>
            </div>
            <Field id="${id}" name="onlineStoreId">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <label htmlFor="siteListing">Site Listing</label>
            </div>
            <Field id="${id}" name="siteListing">
              {({ field }) => <Input {...field} />}
            </Field>
            <div>
              <label htmlFor="dateAdded">Date Added</label>
            </div>
            <Field id="${id}" name="dateAdded">
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
