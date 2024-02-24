import React, { useState } from 'react';

import { Grid, TextField, Button, Container, Typography, Box, createTheme, ThemeProvider} from '@mui/material';
import NavBar from '../Navigation';
import GoogleLoginButton from './GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';


const LogIn = () => {
  const handleLoginSuccess = (response) => {
    // Handle successful login
    console.log('Login Success:', response);
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    console.error('Login Failed:', error);
  };

  return (
    
    <GoogleOAuthProvider clientId="990000531059-kfc3o2bo6rvj4mmnqbc8dkcmqj50kknb.apps.googleusercontent.com">
     <div style={{ padding: '20px' }}>
      <NavBar />
       <Container maxWidth="xs">
        <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography margin="normal" component="h1" variant="h5" color='#000'>
            Sign in
          </Typography>

          <GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
        </Box>
      </Container>

      </div>
    </GoogleOAuthProvider>

  );
};

export default LogIn;


  
// import React, { useState } from 'react';

// import { Grid, TextField, Button, Container, Typography, Box, createTheme, ThemeProvider} from '@mui/material';
// import NavBar from '../Navigation';

// //import BackgroundImage from "./backgroundImage.jpg"

// const serverURL = "";

// const theme = createTheme({
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#ccc', // lighter color for outline
//               },
//               '&:hover fieldset': {
//                 borderColor: '#aaa', // lighter color on hover
//               },
//             },
//             '& .MuiOutlinedInput-input': {
//               color: '#fff', // lighter text color
//             },
//             '& .MuiInputLabel-root': {
//               color: '#fff', // lighter label color
//           },
//         },
//       },
//     },
//   },
// });


// const LogIn = () => {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Handle login logic here
//     console.log('Logging in with:', { username, password });
//   };

  
//   return (
//     <div style={{ padding: '20px' }}>
//       <NavBar />
//       <ThemeProvider theme={theme}>
//       <Container maxWidth="xs">
//       <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5" color='#FFFFFF'>
//           Sign in
//         </Typography>
//         <Box component="form" noValidate sx={{ mt: 1 }}>
          
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="outlined-basic"
//             variant="outlined"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />



//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             onClick={handleLogin}
//           >
//             Sign In
//           </Button>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             onClick={handleLogin}
//           >
//             Sign Up
//           </Button>
//         </Box>
//       </Box>
//       </Container>
//       </ThemeProvider>
//     </div>
//   );
// }

// export default LogIn;
