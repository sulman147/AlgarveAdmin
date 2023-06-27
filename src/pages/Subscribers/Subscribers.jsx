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

const Subscribers = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    // Add more category objects as needed
  ]);

  const [subcribers, setsubcribers] = useState([
    { id: 1, email: "shoaibkiani2@gmail.com" },
    { id: 2, email: "shoaib2@gmail.com" },
    { id: 3, email: "ahmad2@gmail.com" },
    // Add more feature objects as needed
  ]);

  const handleDelete = (id, type) => {
    // Replace this with your API endpoint and logic for deleting data
    const endpoint =
      type === "category" ? `/api/categories/${id}` : `/api/features/${id}`;

    axios
      .delete(endpoint)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        // Update the data grid after deleting the row
        if (type === "category") {
          setCategories(categories.filter((category) => category.id !== id));
        } else {
          setsubcribers(subcribers.filter((feature) => feature.id !== id));
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <h2>Subcribers</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcribers.map((subcriber) => (
                <TableRow key={subcriber.id}>
                  <TableCell>{subcriber.id}</TableCell>
                  <TableCell>{subcriber.email.toLowerCase()}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(subcriber.id, "feature")}
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

export default Subscribers;
