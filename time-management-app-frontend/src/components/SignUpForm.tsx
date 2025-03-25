import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { login } from "../utils/apis/auth";

// Définir les types de rôles disponibles
type UserRole = "jobSeeker" | "employee" | "employer";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("jobSeeker"); // Valeur par défaut
  const [error, setError] = useState<string>("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!name || !email || !password || !confirmPassword || !role) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // In a real app, we would call an API to register the user with the selected role
    // For simulation, we'll just log them in directly
    const result = login(email, password);

    if (result.success) {
      // Dans une application réelle, vous transmettriez également le rôle à l'API
      console.log(`User registered as: ${role}`);
      navigate("/dashboard");
    } else {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignUp}
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Sélection du rôle */}
      <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
        <FormLabel component="legend">I am a:</FormLabel>
        <RadioGroup
          aria-label="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          row
        >
          <FormControlLabel
            value="employee"
            control={<Radio />}
            label="Employee"
          />
          <FormControlLabel
            value="jobSeeker"
            control={<Radio />}
            label="Job Seeker"
          />

          <FormControlLabel
            value="employer"
            control={<Radio />}
            label="Employer"
          />
        </RadioGroup>
      </FormControl>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>

      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/signin")}
        >
          Already have an account? Sign In
        </Link>
        <Box sx={{ mt: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/")}
          >
            Back to Welcome
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
