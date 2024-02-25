import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from '../Navigation';
import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, Select, MenuItem } from '@mui/material';

const SignUp = () => {
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      profilePhoto: '',
      studentNumber: '',
      role: '' 
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting:', userData);
      
    };
  const handleGoogleLogin = (userInfo) => {
    // Handle user sign-up logic here, e.g., sending user info to server
    console.log('User info:', userInfo);
  };


  return (
    <GoogleOAuthProvider clientId="990000531059-kfc3o2bo6rvj4mmnqbc8dkcmqj50kknb.apps.googleusercontent.com"> 
      <NavBar/>

      <div style={{ padding: '20px' }}>
      <Container maxWidth="xs">
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
          <p>Sign up with Google:</p>
          <GoogleLogin
            clientId="YOUR_CLIENT_ID"
            onSuccess={handleGoogleLogin}
            onFailure={(error) => console.log('Google login failed:', error)}
          >
            <button>Sign up with Google</button>
          </GoogleLogin>

               <Select
                margin="normal"
                fullWidth
                value={userData.role}
                onChange={handleChange}
                displayEmpty
                variant="outlined"
                name="role"
                id="role"
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
              <Box sx={{ marginTop: 2}}>
                {userData.role === 'student' && (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="studentNumber"
                    label="Student Number"
                    name="studentNumber"
                    value={userData.studentNumber}
                    onChange={handleChange}
                    variant="outlined"
                  />
                )}
              </Box>

        </Box>
      </Container>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;

// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, Select, MenuItem } from '@mui/material';
// import NavBar from '../Navigation';

// const serverURL = "";
  
//   const SignUp = () => {
//     const [userData, setUserData] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//       profilePhoto: '',
//       studentNumber: '',
//       role: '' 
//     });
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setUserData({
//         ...userData,
//         [name]: value
//       });
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Submitting:', userData);
      
//     };
  
//     return (
//       <div>
//         <NavBar/>
//         <Container maxWidth="xs">
//           <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Typography component="h1" variant="h5" color='#000'>
//               Sign Up
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 name="firstName"
//                 autoFocus
//                 value={userData.firstName}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 value={userData.lastName}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={userData.email}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="profilePhoto"
//                 label="Profile Photo URL"
//                 name="profilePhoto"
//                 value={userData.profilePhoto}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//               <Box sx={{ marginTop: 2}}>

//               <Select
//                 margin="normal"
//                 fullWidth
//                 value={userData.role}
//                 onChange={handleChange}
//                 displayEmpty
//                 variant="outlined"
//                 name="role"
//                 id="role"
//               >
//                 <MenuItem value="" disabled>
//                   Select Role
//                 </MenuItem>
//                 <MenuItem value="student">Student</MenuItem>
//                 <MenuItem value="teacher">Teacher</MenuItem>
//               </Select>
//               <Box sx={{ marginTop: 2}}>
//                 {userData.role === 'student' && (
//                   <TextField
//                     margin="normal"
//                     fullWidth
//                     id="studentNumber"
//                     label="Student Number"
//                     name="studentNumber"
//                     value={userData.studentNumber}
//                     onChange={handleChange}
//                     variant="outlined"
//                   />
//                 )}
//               </Box>

//               </Box>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//         </div>
//     );
//   };
  
//   export default SignUp;