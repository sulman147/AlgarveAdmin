import React, { useState } from "react";
import {
  Button,
  TextField,
  Modal,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: theme.spacing(2),
    outline: "none",
  },
}));

const AddCategoryFormModal = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the feature value, e.g., send it to an API or update state
    console.log(category);
    onClose(); // Close the modal
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
              fullWidth
            />
            <Button
              type="submit"
              style={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
            >
              Add Category
            </Button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default AddCategoryFormModal;
