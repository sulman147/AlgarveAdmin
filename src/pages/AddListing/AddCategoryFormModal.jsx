import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Modal,
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    width: "50%",
    padding: theme.spacing(2),
    outline: "none",
  },
}));

const Api = "http://server.cashbackforever.net:5500/api/";
const token = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

let edit_id = "";
let isEdit = false;

const AddCategoryFormModal = ({ isOpen, newCategories, onClose }) => {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Api}admin/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process the response data
      const data = response.data;
      setCategories(data);
      newCategories(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (edit_id) {
      await axios
        .put(`${Api}admin/category/${edit_id}`, { name: category }, config)
        .then((res) => {
          if (res.data.success) {
            toastr.success(res.data.message);
            fetchData();
            edit_id = "";
            isEdit = false;
            setCategory("");
            // setBlogData(initialBlogData);
          } else {
            toastr.error(res.data.message);
          }
        });
    } else {
      await axios
        .post(`${Api}admin/category`, { name: category }, config)
        .then((res) => {
          if (res.data.success) {
            toastr.success(res.data.message);
            fetchData();
            setCategory("");
            isEdit = false;
            // setBlogData(initialBlogData);
          } else {
            toastr.error(res.data.message);
          }
        });
    }
  };

  const handleEdit = (id, name) => {
    isEdit = true;
    edit_id = id;
    setCategory(name);
    console.log("Edit feature at index:", id);
  };

  const handleDelete = async (id) => {
    // Remove the feature from the list
    await axios.delete(`${Api}admin/features/${id}`, config).then((res) => {
      if (res.data.success) {
        toastr.success(res.data.message);
        fetchData();
      } else {
        toastr.error(res.data.message);
      }
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Card className={classes.card}>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              marginBottom: "20px",
              flexDirection: "row",
            }}
          >
            <TextField
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
              fullWidth
            />
            <Button
              type="submit"
              style={{ width: "200px", marginLeft: "20px" }}
              variant="contained"
              color="primary"
            >
              {isEdit ? "Edit Category" : "Add Category"}
            </Button>
          </form>
          <Typography variant="h4" align="center" gutterBottom>
            Add Category
          </Typography>
          <CategoryDataGrid
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </Modal>
  );
};

const CategoryDataGrid = ({ categories, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ maxHeight: "300px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(category.id, category.name)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDelete(category.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddCategoryFormModal;
