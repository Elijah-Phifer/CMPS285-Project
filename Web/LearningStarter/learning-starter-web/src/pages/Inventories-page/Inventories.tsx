import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Header,
  Segment,
  Table,
  TableBody,
  Button,
  Icon,
} from "semantic-ui-react";
import { ApiResponse, InventoriesGetDto } from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { Form, Formik } from "formik";

import "./inventory-listing.css";

export const InventoriesPage = () => {
  const history = useHistory();
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
        <Segment className="background">
          <Header className="thing-tsb-white">Inventories</Header>
          <Button
            className="ui button thing-tsb-white"
            onClick={() => history.push(routes.inventory.InventoryCreate)}
          >
            <Icon name="add" />
            Create An Inventory Item
          </Button>
          <Table className="table-format">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Id
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Item Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Production Cost
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Quantity
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Availability
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Store Listed at
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Selling Price
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                >
                  Date Added
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                ></Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#44444c", color: "white" }}
                ></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {inventories.map((inventory) => {
                return (
                  <Table.Row key={inventory.id}>
                    {/* <Table.Cell>{inventory.id}</Table.Cell> */}
                    <Table.Cell>{inventory.itemName}</Table.Cell>
                    <Table.Cell>{inventory.productionCost}</Table.Cell>
                    <Table.Cell>{inventory.quantity}</Table.Cell>
                    <Table.Cell>{inventory.availabilty}</Table.Cell>
                    <Table.Cell>{inventory.onlineStoreId}</Table.Cell>
                    <Table.Cell>{inventory.siteListing}</Table.Cell>
                    <Table.Cell>{inventory.dateAdded}</Table.Cell>
                    <Table.Cell>
                      <Button
                        className="ui icon button"
                        onClick={() =>
                          history.push(
                            routes.inventory.InventoryUpdate.replace(
                              ":id",
                              `${inventory.id}`
                            )
                          )
                        }
                      >
                        <Icon name="pencil" />
                      </Button>
                    </Table.Cell>
                    {/* <Table.Cell>
                      <Button
                        onClick={() =>
                          history.push(
                            routes.inventory.InventoryDelete.replace(
                              ":id",
                              `${inventory.id}`
                            )
                          )
                        }
                      >
                        Delete?
                      </Button>
                    </Table.Cell> */}
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
function useRouteMatch<T>() {
  throw new Error("Function not implemented.");
}
