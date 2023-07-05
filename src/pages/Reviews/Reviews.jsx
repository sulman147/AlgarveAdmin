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
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../api/api";

const Reviews = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "Ellen Jacob",
      book_property: "Luxury Resort",
      rating: 5,
      review_text:
        "The most beautifully designed space - we loved everything about it! Every need had been thought of - from the coffee station in the room to the built in charger. It was amazingly",
    },
    {
      id: 1,
      name: "Ellen Jacob",
      book_property: "Luxury Resort",
      rating: 5,
      review_text:
        "The most beautifully designed space - we loved everything about it! Every need had been thought of - from the coffee station in the room to the built in charger. It was amazingly",
    },
    {
      id: 1,
      name: "Ellen Jacob",
      book_property: "Luxury Resort",
      rating: 5,
      review_text:
        "The most beautifully designed space - we loved everything about it! Every need had been thought of - from the coffee station in the room to the built in charger. It was amazingly",
    },
    // Add more feature objects as needed
  ]);

  const handleEdit = (row, type) => {
    // Replace this with your API endpoint and logic for updating data
    const endpoint = type === "category" ? "/api/categories" : "/api/features";

    api
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

    api
      .delete(endpoint)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        // Update the data grid after deleting the row
        if (type === "category") {
          //  setCategories(categories.filter((category) => category.id !== id));
        } else {
          //  setFeatures(features.filter((feature) => feature.id !== id));
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="flex">
      <div className="w-1/2"></div>
      <div className="w-1/2">
        <h2>Reviews</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Booked Property</TableCell>
                <TableCell>Review Text</TableCell>
                <TableCell>Ratings</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell>{feature.id}</TableCell>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell>{feature.book_property}</TableCell>
                  <TableCell>{feature.review_text}</TableCell>
                  <TableCell>
                    {
                      <Rating
                        className="mt-2"
                        name="size-medium"
                        defaultValue={feature.rating}
                      />
                    }
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "300px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleEdit(feature, "feature")}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(feature.id, "feature")}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ paddingTop: "20px" }}
                    >
                      Approve
                    </Button>
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

export default Reviews;
