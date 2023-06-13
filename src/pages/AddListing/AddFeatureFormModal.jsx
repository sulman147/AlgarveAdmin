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

const AddFeatureForm = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [feature, setFeature] = useState("");

  const handleFeatureChange = (event) => {
    setFeature(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the feature value, e.g., send it to an API or update state
    console.log(feature);
    onClose(); // Close the modal
  };

  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Feature"
              value={feature}
              onChange={handleFeatureChange}
              variant="outlined"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Add Feature
            </Button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default AddFeatureForm;
