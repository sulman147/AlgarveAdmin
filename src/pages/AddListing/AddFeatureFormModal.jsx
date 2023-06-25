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

const AddFeatureForm = ({ isOpen, newFeatures, onClose }) => {
  const classes = useStyles();
  const [feature, setFeature] = useState("");
  const [featureList, setFeatureList] = useState([]);

  const handleFeatureChange = (event) => {
    setFeature(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Api}admin/features`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process the response data
      const data = response.data;
      setFeatureList(data);
      newFeatures(data);
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
    // Add the new feature to the list
    if (edit_id) {
      await axios
        .put(`${Api}admin/features/${edit_id}`, { name: feature }, config)
        .then((res) => {
          if (res.data.success) {
            toastr.success(res.data.message);
            fetchData();
            edit_id = "";
            isEdit = false;
            setFeature("");
            // setBlogData(initialBlogData);
          } else {
            toastr.error(res.data.message);
          }
        });
    } else {
      await axios
        .post(`${Api}admin/features`, { name: feature }, config)
        .then((res) => {
          if (res.data.success) {
            toastr.success(res.data.message);
            fetchData();
            setFeature("");
            isEdit = false;
            // setBlogData(initialBlogData);
          } else {
            toastr.error(res.data.message);
          }
        });
    }
    // setFeatureList((prevList) => [...prevList, feature]);
    // Clear the input field
  };

  const handleEdit = (id, name) => {
    // Implement edit functionality here
    isEdit = true;
    edit_id = id;
    setFeature(name);
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
          <Typography variant="h4" align="center" gutterBottom>
            Add Features
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              marginBottom: "20px",
              flexDirection: "row",
            }}
          >
            <TextField
              label="Feature"
              value={feature}
              onChange={handleFeatureChange}
              variant="outlined"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              style={{ width: "200px", marginLeft: "20px" }}
              color="primary"
            >
              {isEdit ? "Edit Featuer" : "Add Feature"}
            </Button>
          </form>
          <TableContainer style={{ maxHeight: "300px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featureList.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell>{feature.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(feature.id, feature.name)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(feature.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default AddFeatureForm;
