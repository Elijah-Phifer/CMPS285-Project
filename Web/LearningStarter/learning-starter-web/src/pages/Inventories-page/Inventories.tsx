import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, Segment, Table, TableBody } from "semantic-ui-react";
import { ApiResponse, InventoriesGetDto } from "../../constants/types";

export const InventoriesPage = () => {
  const [inventories, setInventories] = useState<InventoriesGetDto[]>();
  useEffect(() => {
    const fetchInventories = async () => {
      const response = await axios.get<ApiResponse<InventoriesGetDto[]>>(
        "api/Inventories"
      );
      if (response.data.hasErrors) {
        alert("Something went wrong.");
        return;
      }
      setInventories(response.data.data);
    };
    fetchInventories();
  }, []);

  return (
    <>
      {inventories && (
        <Segment>
          <Header>Inventories</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Item Name</Table.HeaderCell>
                <Table.HeaderCell>Production Cost</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Availability</Table.HeaderCell>
                <Table.HeaderCell>Online Store Id</Table.HeaderCell>
                <Table.HeaderCell>Site Listing</Table.HeaderCell>
                <Table.HeaderCell>Date Added</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {inventories.map((inventory) => {
                return (
                  <Table.Row key={inventory.id}>
                    <Table.Cell>{inventory.id}</Table.Cell>
                    <Table.Cell>{inventory.itemName}</Table.Cell>
                    <Table.Cell>{inventory.productionCost}</Table.Cell>
                    <Table.Cell>{inventory.quantity}</Table.Cell>
                    <Table.Cell>{inventory.availability}</Table.Cell>
                    <Table.Cell>{inventory.onlineStoreId}</Table.Cell>
                    <Table.Cell>{inventory.siteListing}</Table.Cell>
                    <Table.Cell>{inventory.dateAdded}</Table.Cell>
                  </Table.Row>
                );
              })}
            </TableBody>
          </Table>
        </Segment>
      )}
    </>
  );
};
