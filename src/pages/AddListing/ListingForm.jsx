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
import api from "../../api/api";
import countries from "./algarve.json";
import AddFeatureForm from "./AddFeatureFormModal";
import AddCategoryFormModal from "./AddCategoryFormModal";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import MapWithPinpoint from "../../components/MapWithpinPoint";
import Editor from "../../components/texteditor/editor";
import ReactQuill from "react-quill";
const initialFormState = {
  title: "",
  location: "",
  category_id: "",
  description: "",
  no_of_guests: "",
  no_of_adults: "",
  no_of_pets: "",
  city: "",
  country: "Portugal",
  stay_type: "",
  video_link: "",
  features: [],
  rent: "",
  contact_number: "",
  gallery: [],

  lat: "",
  lon: "",
  short_description: "",
  long_description: "", // From pluralo api pluralo -> agent's products.
  additional_info: "", //From pluralo api pluralo -> agent's products.
  image_logo: "", //From pluralo api pluralo -> agent's products.
  agent_id: "", //From pluralo api pluralo -> selected agent.
  product_id: "", //From pluralo api pluralo -> agent's products selected product.
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

const ListingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormState);
  const [listings, setListings] = useState([]);
  const [agentList, setagentsList] = useState([]);
  const [selectedAgent, setSelectAgent] = useState(null);
  const [agentProductsList, setAgentProductsList] = useState([]);
  const [selectedProduct, setSelectProduct] = useState(null);
  const [F, setF] = useState([]);

  const [locations, setLocations] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [Categories, setCategories] = useState([]);
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

  const handleInputChangedescription = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ["long_description"]: e,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`admin/listings`);

      // Process the response data
      const data = response.data;
      setListings(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  const fetchAgents = async () => {
    try {
      const response = await api.get(`suppliers`);

      // Process the response data
      const data = response.data;
      setagentsList(data?.Data);
      return data;
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await api.get(`admin/features`);

      // Process the response data
      const data = response.data;
      setF(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  const fetchAgentsProducts = async (agentId) => {
    try {
      const response = await api.get(`suppliers/${agentId}`);

      // Process the response data
      const data = response.data;
      setAgentProductsList(data?.Data);

      return data;
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  const fetchLocations = async () => {
    try {
      const response = await api.get("admin/city");
      setLocations(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const settingLocation = (data) => {
    const coordinates = data.split(",");
    setFormValues({
      ...formValues,
      lat: coordinates[0],
      lon: coordinates[1],

      location: data,
    });
  };

  const [loc, setloc] = useState("");
  const settingLocationByDropDown = (e) => {
    setloc(e.target?.value);

    if (e.target?.value) {
      let selectedLocation = locations.find((o) => o.city === e.target?.value);

      console.log("selected", selectedLocation);
      setFormValues((prev) => ({
        ...prev,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
        city: selectedLocation.city,
        country: selectedLocation.country,
        location: selectedLocation.city + " , " + selectedLocation.country,
      }));
    }
  };

  useEffect(() => {
    fetchData();
    fetchAgents();
    fetchFeatures();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedAgent != null) {
      fetchAgentsProducts(selectedAgent);
    }
  }, [selectedAgent]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedFeatures = checked
      ? [...formValues.features, name]
      : formValues?.features?.filter((feature) => feature !== `${name}`);
    setFormValues({ ...formValues, features: updatedFeatures });
  };
  const handleImageChange = (e) => {
    isEditing = false;
    const files = e.target.files;
    let newfiles = [];
    for (let i = 0; i < files.length; i++) {
      newfiles?.push(files[i]);
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      gallery: newfiles,
    }));
  };

  const endpoint = `/admin/listings`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.id) {
      await api
        .put(`admin/listings/${formValues.id}`, formValues)
        .then((res) => {
          if (res.data.success) {
            console.log("this is message", res.data.message);
            Addimage(formValues.id);
            toastr.error(res.data.message);

            // setBlogData(initialBlogData);
          } else {
            toastr.error(res.data.message);
          }
        });
      // const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      // setBlogs(updatedBlogs);
    } else {
      const response = await api.post(endpoint, formValues);

      if (response.data.success) {
        toastr.success("New listing added");
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
    for (let i = 0; i < formValues?.gallery?.length; i++) {
      formData.append("gallery", formValues?.gallery[i]);
    }
    // formValues.gallery.forEach((item) => formData.append(item));
    // formData.append("gallery", formValues.gallery);
    api.put(`admin/listings/gallery/${id}`, formData).then((resp) => {
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

  const handleEdit = async (listing) => {
    isEditing = true;
    // Populate the form with the selected listing data
    //  setSelectProduct({})
    const ag = await fetchAgents();

    setSelectAgent(ag?.Data?.find((a) => a.Id == listing.agent_id));

    // const pd = await fetchAgentsProducts(listing?.product_id);

    // setSelectProduct(pd?.Data?.find((a) => a.Id == listing.product_id))

    console.log("ima listing", listing);
    setFormValues({ ...listing, stay_type: listing.stay_type });

    setActiveStep(0); // Move to the 1st step
  };

  const handleDelete = async (id) => {
    const response = await api.delete(`admin/listings/${id}`);
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
              <FormControl fullWidth variant="outlined">
                <InputLabel>Agents</InputLabel>
                <Select
                  name="Agent"
                  value={isEditing ? formValues.agent_id : selectedAgent}
                  onChange={(e) => {
                    setSelectAgent(e.target.value);
                    handleFormChange(e);
                  }}
                  label="Agent"
                >
                  <MenuItem value="">Select Agent</MenuItem>

                  {agentList?.map((agent) => (
                    <MenuItem key={agent.Id} value={agent?.Id}>
                      {agent.BrandName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Product</InputLabel>
                <Select
                  name="Product"
                  value={isEditing ? formValues.agent_id : selectedProduct}
                  onChange={(e) => {
                    setSelectProduct(e.target?.value);
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      title: e.target?.value?.Name,
                      long_description: e.target?.value?.Description,
                      short_description: e.target?.value?.ShortDescription,
                      additional_info: e.target?.value?.AdditionalInformation,
                      image_logo: e.target.value?.ImageLogo,
                      product_id: e.target.value?.Id,
                      agent_id: selectedAgent,
                    }));
                  }}
                  label="Product"
                >
                  <MenuItem value="">Select Product</MenuItem>

                  {agentProductsList?.map((agent) => (
                    <MenuItem key={agent.Id} value={agent}>
                      {agent.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                variant="outlined"
                value={formValues?.title}
                onChange={handleFormChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category_id"
                  value={formValues?.category_id}
                  onChange={handleFormChange}
                  label="Category"
                >
                  <MenuItem value="">Select Category</MenuItem>

                  {Categories?.map((category) => (
                    <MenuItem key={category} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Stay Type</InputLabel>
                <Select
                  name="stay_type"
                  value={formValues?.stay_type}
                  onChange={handleFormChange}
                  label="Category"
                >
                  <MenuItem value="">Stay Type</MenuItem>
                  <MenuItem key={"1"} value={"Night Stay"}>
                    Night Stay
                  </MenuItem>
                  <MenuItem key={"2"} value={"Weekly Stay"}>
                    Weekly Stay
                  </MenuItem>{" "}
                  <MenuItem key={"3"} value={"Monthly Stay"}>
                    Monthly Stay
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                border: "1px solid black",
                borderWidth: "1px",
                backgroundColor: "pink",
              }}
            >
              Description
              {console.log("jj", formValues)}
              <ReactQuill
                name="description"
                label="Product Description"
                value={formValues.long_description}
                onChange={handleInputChangedescription}
                style={{ marginBottom: "1rem" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="no_of_guests"
                label="No of Guests"
                type="number"
                variant="outlined"
                value={formValues?.no_of_guests}
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
                value={formValues?.no_of_adults}
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
                value={formValues?.no_of_pets}
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
              {Features?.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={formValues?.features?.includes(`${item.id}`)}
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

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Location</InputLabel>
                <Select
                  name="locations"
                  value={formValues.city}
                  onChange={settingLocationByDropDown}
                  defaultValue={""}
                  label="locations"
                >
                  <MenuItem value="" disabled>
                    Select Location
                  </MenuItem>
                  {/* Render dropdown options dynamically */}
                  {locations?.map((category) => (
                    <MenuItem key={category.id} value={category.city}>
                      {category.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <h4>Please Select Your Location:</h4>
            {console.log("first", formValues)}
            <MapWithPinpoint
              choseLocation={settingLocation}
              pos={
                formValues.lat
                  ? [formValues.lat, formValues.lon]
                  : [33.7077, 73.0498]
              }
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
                {formValues?.gallery?.map((image, index) => (
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
      {listings?.map((listing) => (
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
