import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  // SelectChangeEvent,
  Grid,
  Checkbox,
  // ListItemText,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import logo from "../assers/logo.svg";
import { LogoText, Text } from "./LoginStyles";
// import "./Login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";  // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";  // Import the CSS for the toast notifications

interface RegistrationDataErrors {
  full_name?: string;
  employee_id?: string;
  department?: string;
  position_title?: string;
  email?: string;
  phone?: number;
  role?: string;
  supervisor_approval?: boolean;
  date_of_registration?: Date;
  username?: string;
  password?: string;
  confirm_password?: string;
  agreement_to_terms_and_conditions?: boolean;
  consent_to_receive_notification?: boolean;
  checked?: boolean;
  supervisor_approval_document?: string;
}

interface FormData {
  full_name: string;
  employee_id: string;
  department: string;
  position_title: string;
  email: string;
  phone: string;
  role: string;
  supervisor_approval: boolean;
  date_of_registration: string;
  username: string;
  password: string;
  confirm_password: string;
  agreement_to_terms_and_conditions: boolean;
  consent_to_receive_notification: boolean;
  supervisor_approval_document: string | null; // for file uploads
}

const Registration: React.FC = () => {
  const [registrationDataErrors, setRegistrationDataErrors] = useState<RegistrationDataErrors>({});
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    employee_id: "",
    department: "",
    position_title: "",
    email: "",
    phone: "",
    role: "",
    supervisor_approval: false,
    date_of_registration: "",
    username: "",
    password: "",
    confirm_password: "",
    agreement_to_terms_and_conditions: false,
    consent_to_receive_notification: false,
    supervisor_approval_document: null,
  });

  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);  // State to toggle visibility of password
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);  // State to toggle visibility of confirm password

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/choices/");
        const data = await response.json();
        setDepartments(
          Object.entries(data.departments).map(([key, value]) => ({
            value: key,
            label: value,
          }))
        );
        setRoles(
          Object.entries(data.roles).map(([key, value]) => ({
            value: key,
            label: value,
          }))
        );
      } catch (error) {
        console.error("Error fetching department and role choices:", error);
      }
    };

    fetchChoices();
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    setRegistrationDataErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    console.log("Form Data before submitting:", formData);
  
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value); // Handle file inputs (e.g., supervisor_approval_document)
        } else {
          // Append all values (including null and undefined) directly
          formDataToSend.append(key, value === null ? "" : value.toString()); // Use empty string for null values
        }
      }
  
      const response = await fetch("http://127.0.0.1:8000/offsignup/", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert("Signup failed: " + JSON.stringify(errorData));
        return;
      }
      toast.success("Registration successful!"); 
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred. Please try again later.");  

    }
  };
  
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
  
    // Check if the target is an HTMLInputElement
    if (event.target instanceof HTMLInputElement) {
      const { type, checked, files } = event.target;
  
      if (type === "checkbox") {
        // Handle checkbox input
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else if (type === "file" && files) {
        // Handle file input
        setFormData((prev) => ({
          ...prev,
          [name]: files[0] || null, // Handle file input (first file if exists)
        }));
      } else {
        // Handle other input types (e.g., text, email, etc.)
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      // Handle case for other types (like SelectChangeEvent)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  
  
  
  
  return (
    <>
    <Grid container minHeight={"100vh"} spacing={2}>
      <Grid
        item
        xs={12}
        sm={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center" width="100%">
          <Box component={"img"} src={logo} width={"100%"} height={"80%"} />
          <LogoText
            className="Logo_text"
            fontSize="25px !important"
            fontWeight="bold"
          >
            Victorian Translational Research Institute
          </LogoText>
        </Box>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Container component="main" maxWidth="sm">
          <Box display="flex" justifyContent="center">
            <LogoText
              className="Logo_texts"
              sx={{
                background:
                  "linear-gradient(105deg,rgb(0, 76, 172),rgb(13, 117, 219),rgb(23, 143, 178), rgb(23, 89, 124), rgb(26, 191, 166),rgb(0, 37, 125))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontWeight: "bold",
              }}
            >
              VicTRI{" "}
            </LogoText>
          </Box>
          <Text display="flex" justifyContent="center" mt={-5} variant="h4">
            Registration Form
          </Text>
          <Box component="form" noValidate onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                id="fullName"
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  size="small"

                  error={!!registrationDataErrors.full_name}
                  helperText={registrationDataErrors.full_name}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Employee ID"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                />
              </Grid>

              {/* <Grid item xs={6}>
                <FormControl fullWidth margin="normal" required size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleSelectChange}
                  >
                    {/* <MenuItem value="" disabled>Select your department</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))} */}
                  {/* </Select>
                </FormControl>
              </Grid> */} 
              {/* <Grid item xs={6}>
                <TextField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                />
              </Grid> */}
<Grid item xs={6}>
                <FormControl fullWidth margin="normal" required size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>Select your department</MenuItem>
                    {departments.map((dept) => (
                      <MenuItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Position_Title"
                  name="position_title"
                  value={formData.position_title}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                />
              </Grid>

              {/* <Grid item xs={6}>
                <TextField
                  label="Role"
                  name="role"
                  value={formData.role}
                  margin="normal"
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  error={!!registrationDataErrors.role}
                  helperText={registrationDataErrors.role}
                />
              </Grid> */}
 <Grid item xs={6}>
                <FormControl fullWidth margin="normal" required size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>Select your role</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  label="Date of Registration"
                  name="date_of_registration"
                  type="date"
                  value={formData.date_of_registration}
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Grid> */}

              <Grid item xs={6}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                  autoComplete="username"

                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                   autoComplete="new-password"
                   InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setPasswordVisible(!passwordVisible)}  // Use IconButton here
                          edge="end"
                        >
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Confirm Password"
                  name="confirm_password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  margin="normal"
                  
                  fullWidth
                  size="small"
                  
                  autoComplete="new-password" 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}  // Use IconButton here
                          edge="end"
                        >
                          {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="supervisor_approval"
                      checked={formData.supervisor_approval}
                      onChange={handleChange}
                    />
                  }
                  label="Check if supervisor approved (or upload authorization letter)"
                />
                <TextField
                  type="file"
                  name="supervisor_approval_document"
                  // value={formData.supervisor_approval_document}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreement_to_terms_and_conditions"
                      checked={formData.agreement_to_terms_and_conditions}
                      onChange={handleChange}
                      
                    />
                  }
                  label="I agree to the Terms and Conditions"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="consent_to_receive_notification"
                      checked={formData.consent_to_receive_notification}
                      onChange={handleChange}
                    />
                  }
                  label="I consent to receive notifications"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
    <ToastContainer />
        </>
  );
};

export default Registration;
