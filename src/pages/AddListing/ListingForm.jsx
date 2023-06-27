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
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import MapWithPinpoint from "../../components/MapWithpinPoint";

const initialFormState = {
  id: "",
  title: "",
  location: "",
  category_id: "",
  description: "",
  no_of_guests: "",
  no_of_adults: "",
  no_of_pets: "",
  city: "",
  country: "Portugal",
  stay_type: 2,
  video_link: "",
  features: [],
  rent: "",
  contact_number: "",
  gallery: [],
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
  const [listings, setListings] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [location, setLocation] = useState("");
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
  const settingLocation = (data) => {
    setFormValues({ ...formValues, location: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedFeatures = checked
      ? [...formValues.features, name]
      : formValues.features.filter((feature) => feature !== `${name}`);
    setFormValues({ ...formValues, features: updatedFeatures });
  };
  const handleImageChange = (e) => {
    isEditing = false;
    const files = e.target.files;
    let newfiles = [];
    for (let i = 0; i < files.length; i++) {
      newfiles.push(files[i]);
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      gallery: newfiles,
    }));
  };

  const endpoint = "http://server.cashbackforever.net:5500/api/admin/listings";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.id) {
      await axios
        .put(`${Api}admin/listings/${formValues.id}`, formValues, config)
        .then((res) => {
          if (res.data.success) {
            console.log("this is message", res.data.message);
            Addimage(formValues.id);

            // setBlogData(initialBlogData);
          } else {
            toastr.error(res.data.message);
          }
        });
      // const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      // setBlogs(updatedBlogs);
    } else {
      const response = await axios.post(endpoint, formValues, config);
      if (response.data.success) {
        Addimage(response.data.data.id);
      } else {
        toastr.error(response.data.message);
      }
    }
  };
  //   function getBase64(file) {
  //    var reader = new FileReader();
  //    reader.readAsDataURL(file);
  //    reader.onload = function () {
  //      console.log(reader.result);
  //    };
  //    reader.onerror = function (error) {
  //      console.log('Error: ', error);
  //    };
  // }

  const Addimage = (id) => {
    const formData = new FormData();
    for (let i = 0; i < formValues.gallery.length; i++) {
      formData.append("gallery", formValues.gallery[i]);
    }
    // formValues.gallery.forEach((item) => formData.append(item));
    // formData.append("gallery", formValues.gallery);
    axios
      .put(`${Api}admin/listings/gallery/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((resp) => {
        console.log("this is res after image uploading", resp);
        setFormValues(initialFormState);
        fetchData();
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
    isEditing = true;
    // Populate the form with the selected listing data
    setFormValues({ ...listing, stay_type: listing.stay_type_id });
    setActiveStep(0); // Move to the 1st step
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`${Api}admin/listings/${id}`, config);
    // const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
    // setBlogs(updatedBlogs);
    if (response.data.success) {
      toastr.success(response.data.message);
      fetchData();
    } else {
      toastr.error(response.data.message);
    }
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
                <InputLabel>City</InputLabel>
                <Select
                  name="city"
                  value={formValues.city}
                  onChange={handleFormChange}
                  label="City"
                >
                  <MenuItem value="">Select City</MenuItem>
                  {/* Render dropdown options dynamically */}
                  {countries.map((item) => (
                    <MenuItem key={item.id} value={item.city}>
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
                  name="category_id"
                  value={formValues.category_id}
                  onChange={handleFormChange}
                  label="Category"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {/* Render dropdown options dynamically */}
                  {Categories.map((category) => (
                    <MenuItem key={category} value={category.id}>
                      {category.name}
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
              {Features.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={formValues.features.includes(`${item.id}`)}
                      onChange={handleCheckboxChange}
                      name={item.id}
                    />
                  }
                  label={item.name}
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
            <h4>Please Select Your Location:</h4>
            {console.log("first", formValues)}
            <MapWithPinpoint
              choseLocation={settingLocation}
              pos={formValues.location}
            />
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
                {formValues.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={isEditing ? image.image : URL.createObjectURL(image)}
                    alt="Listing Images"
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
              <AddFeatureForm
                isOpen={isModalOpen}
                newFeatures={setFeatures}
                onClose={handleCloseModal}
              />
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
                newCategories={setCategories}
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
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(listing)}
            >
              Edit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="outlined"
              color="secondary"
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
