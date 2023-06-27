import React, { useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const Customers = () => {
  const [customers, setFeatures] = useState([
    {
      id: 1,
      name: "Shoaib Ali",
      user_name: "shoaibkiani2",
      email: "shoaibkiani2@gmail.com",
    },
    {
      id: 1,
      name: "Shoaib Ali",
      user_name: "shoaibkiani2",
      email: "shoaibkiani2@gmail.com",
    },
    {
      id: 1,
      name: "Shoaib Ali",
      user_name: "shoaibkiani2",
      email: "shoaibkiani2@gmail.com",
    },
    {
      id: 1,
      name: "Shoaib Ali",
      user_name: "shoaibkiani2",
      email: "shoaibkiani2@gmail.com",
    },

    // Add more feature objects as needed
  ]);

  // const handleEdit = (row, type) => {
  //   // Replace this with your API endpoint and logic for updating data
  //   const endpoint = type === "category" ? "/api/categories" : "/api/features";

  //   axios
  //     .put(endpoint, row)
  //     .then((response) => {
  //       // Handle success response
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  // };

  // const handleDelete = (id, type) => {
  //   // Replace this with your API endpoint and logic for deleting data
  //   const endpoint =
  //     type === "category" ? `/api/categories/${id}` : `/api/features/${id}`;

  //   axios
  //     .delete(endpoint)
  //     .then((response) => {
  //       // Handle success response
  //       console.log(response.data);
  //       // Update the data grid after deleting the row
  //       if (type === "category") {
  //         setCategories(categories.filter((category) => category.id !== id));
  //       } else {
  //         setFeatures(features.filter((feature) => feature.id !== id));
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  // };

  return (
    <div className="flex">
      <div className="w-1/2"></div>
      <div className="w-1/2">
        <h2>Customers</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, Index) => (
                <TableRow key={customer.id}>
                  <TableCell>{Index + 1}</TableCell>
                  <TableCell>{customer.user_name}</TableCell>
                  <TableCell>{customer.name}</TableCell>{" "}
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {/* <IconButton
                      //    onClick={() => handleEdit(feature, "feature")}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton> */}
                    <IconButton
                      //   onClick={() => handleDelete(feature.id, "feature")}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Customers;
