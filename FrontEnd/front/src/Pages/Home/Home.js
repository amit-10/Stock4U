import './Home.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import { authContext } from '../../Context/auth.context';
import { IconButton } from '@mui/material';
import { Login } from '@mui/icons-material';
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button} from '@mui/material';
import { login, register } from '../../Services/Backend.service';

function Home() {
    const [open, setOpen] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
  
    const [auth, setAuth] = useContext(authContext);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setOpenSignUp(false);
      };
    
      const handleSignUp = () => {
        setOpen(false);
        setOpenSignUp(true);
      };
    
      const logIn = async (userId, password) => {
        try {
          await login(userId, password);
          const credentials = { userId, password };
          localStorage.setItem("Stock4UCredentials", JSON.stringify(credentials));
          setAuth({ userId, password });
        }
        catch (e) {
          console.log('login failed', e);
        }
      }
    
      const signUp = async (userId, firstName, lastName, riskLevel, email, password) => {
        try {
          await register({ userId, email, password, firstName, lastName, riskLevel });
          setAuth({ userId, email, password, firstName, lastName, riskLevel });
        }
        catch (e) {
          console.log('Sign up failed', e);
        }
      }

    return <div className="App">
        <Typography color="#405D72" variant="h2" gutterBottom> Welcome to STOCK4U! </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', width: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Follow your profits!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', width: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Invest without Risk!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', width: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Learn With ease!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', width: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Compete against your friends!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', width: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Earn achievements
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', width: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Gain knowledge!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

        </div>  

        <Typography component="div" variant="h2">
            Join over a million customers
        </Typography>      
        <Typography component="div" variant="h2">
            All over the world!
        </Typography>

        <IconButton
            size="large"
            edge="end"
            onClick={handleClickOpen}
            color="inherit"
        >
            <Login />
        </IconButton>

        <div className="Dialog">
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData).entries());
              logIn(formJson.userId, formJson.password);
              handleClose();
            },
          }}
        >
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="userId"
              label="User ID"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Sign In</Button>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openSignUp}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData).entries());
              signUp(formJson.userId, formJson.firstName, formJson.lastName, formJson.riskLevel, formJson.email, formJson.password);
              handleClose();
            },
          }}
        >
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="userId"
              name="userId"
              label="User ID"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="riskLevel"
              name="riskLevel"
              label="Risk Level"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Sign Up</Button>
          </DialogActions>
        </Dialog>
        </div>
    </div>;

}

export default Home;