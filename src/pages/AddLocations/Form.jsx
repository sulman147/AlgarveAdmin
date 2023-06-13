import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Grid } from "@material-ui/core";

const Form = ({ cities, onCitySubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    city: "",
    latlng: ["", ""],
    country: "",
    iso2: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLatLngChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      latlng: prevFormData.latlng.map((coord, i) =>
        i === index ? value : coord
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCitySubmit(formData);
    setFormData({
      id: "",
      city: "",
      latlng: ["", ""],
      country: "",
      iso2: "",
    });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Latitude"
                name="latitude"
                value={formData.latlng[0]}
                onChange={(e) => handleLatLngChange(0, e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Longitude"
                name="longitude"
                value={formData.latlng[1]}
                onChange={(e) => handleLatLngChange(1, e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="ISO2"
                name="iso2"
                value={formData.iso2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
