import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Label, Table } from "semantic-ui-react";
import {
  ApiResponse,
  InventoriesUpdateDto,
  InventoriesGetDto,
  InventoriesDeleteDto,
  InventoriesCreateDto,
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
    const fetchInventories = async () => {

      const response = await axios.get<ApiResponse<InventoriesGetDto>>(
        `/api/Inventories/${id}`
      );

      setInventories(response.data.data);
    };


    fetchInventories();

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

  const Click = async () => {
    const response = await axios.delete<ApiResponse<InventoriesGetDto>>(
      `/api/Inventories/${id}`
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
              <label htmlFor="availability">availability</label>
            </div>
            <Field id="availability" name="availability">

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
            <div></div>
            <br></br>
            <Button inverted color="green" type="submit">
              Submit
            </Button>
            <Button
              inverted
              color="orange"
              onClick={() => {
                history.push(routes.inventory.Inventory);

              }}
            >

              Return
            </Button>
            <Button inverted color="red" onClick={Click}>
              Delete?
            </Button>
          </Form>
        </Formik>
      )}
    </>
  );
};
