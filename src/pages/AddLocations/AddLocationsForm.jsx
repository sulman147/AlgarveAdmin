import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import api from "../../api/api";
import countries from "../AddListing/algarve.json";

const AddLocationForm = () => {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    lat: "",
    lon: "",
    country: "",
  });

  const fetchCities = async () => {
    try {
      const response = await api.get("admin/city");
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLatLngChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const latlng = [...prevState.lat];
      latlng[index] = value;
      return { ...prevState, latlng };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("this is form data", formData);
      if (formData.id) {
        await api.put(`admin/city/${formData.id}`, formData);
      } else {
        await api.post("admin/city", formData);
      }
      setFormData({
        city: "",
        lat: "",
        lon: "",
        country: "",
      });

      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (city) => {
    setFormData(city);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`admin/city/${id}`);
      fetchCities();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Location
      </Typography>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="City"
                      variant="outlined"
                      fullWidth
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Latitude"
                      variant="outlined"
                      fullWidth
                      name="lat"
                      value={formData.lat}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Longitude"
                      variant="outlined"
                      fullWidth
                      name="lon"
                      value={formData.lon}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Country"
                      variant="outlined"
                      fullWidth
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <div style={{ marginTop: "10px", width: "100%" }}>
          <Grid item xs={12} m={5} sm={12}>
            <Card>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Latitude</TableCell>
                        <TableCell>Longitude</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cities.map((city) => (
                        <TableRow key={city.id}>
                          <TableCell>{city.id}</TableCell>
                          <TableCell>{city.city}</TableCell>
                          <TableCell>{city.lat}</TableCell>
                          <TableCell>{city.lon}</TableCell>
                          <TableCell>{city.country}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ mx: 2 }}
                              startIcon={<Edit />}
                              onClick={() => handleEdit(city)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              sx={{ mx: 2 }}
                              startIcon={<Delete />}
                              onClick={() => handleDelete(city.id)}
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
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default AddLocationForm;
