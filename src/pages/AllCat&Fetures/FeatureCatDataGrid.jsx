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

const FeatureCatDataGrid = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    // Add more category objects as needed
  ]);

  const [features, setFeatures] = useState([
    { id: 1, name: "Feature 1" },
    { id: 2, name: "Feature 2" },
    // Add more feature objects as needed
  ]);

  const handleEdit = (row, type) => {
    // Replace this with your API endpoint and logic for updating data
    const endpoint = type === "category" ? "/api/categories" : "/api/features";

    axios
      .put(endpoint, row)
      .then((response) => {
        // Handle success response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

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
          setFeatures(features.filter((feature) => feature.id !== id));
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
        <h2>Categories</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(category, "category")}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(category.id, "category")}
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
      <div className="w-1/2">
        <h2>Features</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>{feature.id}</TableCell>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(feature, "feature")}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(feature.id, "feature")}
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

export default FeatureCatDataGrid;
