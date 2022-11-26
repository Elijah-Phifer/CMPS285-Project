import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input, Label, Modal, Table } from "semantic-ui-react";
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
  const [open, setOpen] = React.useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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

  const Click1 = async () => {
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

  const Click2 = async () => {
    setOpen(false);
    history.push(routes.inventory.Inventory);
  };

  return (
    <>
      {inventories && (
        <Formik initialValues={inventories} onSubmit={onSubmit}>
          <Modal
            basic
            trigger={<Button color="grey"></Button>}
            as={Form}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={true}
          >
            <Modal.Header>Edit your inventory</Modal.Header>
            <Modal.Content>
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
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button inverted color="green" type="submit">
                Submit
              </Button>
              <Button inverted color="orange" onClick={Click2}>
                Return
              </Button>
              <Button inverted color="red" onClick={Click1}>
                Delete?
              </Button>
            </Modal.Actions>
          </Modal>
        </Formik>
      )}
    </>
  );
};
