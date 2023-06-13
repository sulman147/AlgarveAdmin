import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import axios from "axios";
import countries from "./algarve.json";
import AddFeatureForm from "./AddFeatureFormModal";
import AddCategoryFormModal from "./AddCategoryFormModal";

const initialFormState = {
  id: "",
  title: "",
  location: "",
  category: "",
  description: "",
  no_of_guests: "",
  no_of_adults: "",
  no_of_pets: "",
  city: "Albufeira",
  country: "Portugal",
  stay_type: 2,
  video_link: "",
  features: [],
  rent: "",
  contact_number: "",
  images: [],
};
const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    width: "100%",
    padding: "20px",
    backgroundColor: "white",
  },
  field: {
    marginBottom: "10px",
  },
  submitButton: {
    marginTop: "20px",
  },
  ButtonsBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: "white",
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const categories = [1, 2, 3];
const dummyData = [
  {
    id: 1,
    title: "Listing 1",
    location: "Location 1",
    category: "Category 1",
    description: "Description 1",

    no_of_guests: 5,
    no_of_adults: 2,
    no_of_pets: 1,
    features: ["1", "3", "4", "6", "2"],
    rent: 100,
    contact_number: "1234567890",
    images: [
      "https://server.cashbackforever.net/public/blogs/1686647843657-3.jpg",
      "https://server.cashbackforever.net/public/blogs/1686647843657-3.jpg",
    ],
  },
  // Add more dummy data here
];
let isEditing = false;
const Api = "http://server.cashbackforever.net:5500/api/";
const token = localStorage.getItem("accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ListingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormState);
  const [listings, setListings] = useState(dummyData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const classes = useStyles();
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Api}admin/listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process the response data
      const data = response.data;
      setListings(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedFeatures = checked
      ? [...formValues.features, name]
      : formValues.features.filter((feature) => feature !== name);
    setFormValues({ ...formValues, features: updatedFeatures });
  };
  const handleImageChange = (e) => {
    isEditing = false;
    const files = Array.from(e.target.files);
    setFormValues((prevValues) => ({
      ...prevValues,
      images: files,
    }));
  };
  const token = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const endpoint = "http://server.cashbackforever.net:5500/api/admin/listings";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.id) {
      const response = await axios.put(
        `${Api}admin/listings/${formValues.id}`,
        formValues,
        config
      );
      // const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      // setBlogs(updatedBlogs);
      if (response.data.success) {
        console.log("this is message", response.data.message);
        Addimage(formValues.id);

        // setBlogData(initialBlogData);
      }
    } else {
      const response = await axios.post(endpoint, formValues, config);
      if (response.data.success) {
        console.log(response.data.message);
        Addimage(response.data.data.id);
      }
    }
  };

  const Addimage = (id) => {
    const formData = new FormData();
    formData.append("image", formValues.images);
    axios
      .put(`${Api}admin/listings/gallery/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((resp) => {
        console.log("this is res after image uploading", resp);
        fetchData();
        // return true
      });
  };
  const handleCatButtonClick = () => {
    setIsCatModalOpen(true);
  };

  const handleCatCloseModal = () => {
    setIsCatModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (listing) => {
    console.log("this is listing", listing);
    isEditing = true;
    // Populate the form with the selected listing data
    setFormValues(listing);
    setActiveStep(0); // Move to the 1st step
  };

  const handleDelete = (id) => {
    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== id)
    );
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                variant="outlined"
                value={formValues.title}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Location</InputLabel>
                <Select
                  name="location"
                  value={formValues.location}
                  onChange={handleFormChange}
                  label="Location"
                >
                  <MenuItem value="">Select Location</MenuItem>
                  {/* Render dropdown options dynamically */}
                  {countries.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formValues.category}
                  onChange={handleFormChange}
                  label="Category"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {/* Render dropdown options dynamically */}
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {`category ${category}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={formValues.description}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="no_of_guests"
                label="No of Guests"
                type="number"
                variant="outlined"
                value={formValues.no_of_guests}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="no_of_adults"
                label="No of Adults"
                type="number"
                variant="outlined"
                value={formValues.no_of_adults}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="no_of_pets"
                label="No of Pets"
                type="number"
                variant="outlined"
                value={formValues.no_of_pets}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p>Features:</p>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <FormControlLabel
                  key={num}
                  control={
                    <Checkbox
                      checked={formValues.features.includes(`${num}`)}
                      onChange={handleCheckboxChange}
                      name={`${num}`}
                    />
                  }
                  label={`Feature ${num}`}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="rent"
                label="Rent"
                type="number"
                variant="outlined"
                value={formValues.rent}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="video_link"
                label="Video URL"
                variant="outlined"
                value={formValues.video_link}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="contact_number"
                label="Contact Number"
                variant="outlined"
                value={formValues.contact_number}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                multiple
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Upload Images
                </Button>
              </label>
              <Box mt={2}>
                {formValues.images.map((image, index) => (
                  <img
                    key={index}
                    src={isEditing ? image : URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    width="200"
                    height="200"
                    style={{
                      margin: "5px",
                      border: "1px solid",
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.container}>
        <div className={classes.ButtonsBar}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Listing
          </Typography>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
              >
                Add Feature
              </Button>
              <AddFeatureForm isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCatButtonClick}
              >
                Add Category
              </Button>
              <AddCategoryFormModal
                isOpen={isCatModalOpen}
                onClose={handleCatCloseModal}
              />
            </div>
          </div>
        </div>
        <hr />
        <Stepper my={4} activeStep={activeStep}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>
        <Box my={4} bgcolor="white" p={2}>
          {renderStepContent(activeStep)}
          <Box display="flex" justifyContent="space-between" mt={4}>
            {activeStep > 0 && (
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep < 2 && (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
            {activeStep === 2 && (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </div>
      <Typography variant="h4" align="center" gutterBottom>
        All Listing
      </Typography>
      {listings.map((listing) => (
        <Box key={listing.id} bgcolor="white" my={2} p={2} border={1}>
          <Typography variant="h6">{listing.title}</Typography>
          <Typography variant="subtitle1">{listing.location}</Typography>
          {/* Render other listing details */}
          <Box mt={2}>
            <Button variant="contained" onClick={() => handleEdit(listing)}>
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDelete(listing.id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default ListingForm;
