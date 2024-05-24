import './Header.css';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';


function Header() {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
      <header class="Header">
            <Avatar alt={email} src="/static/images/avatar/1.jpg" /> {email}
            <TextField label="Search" InputProps={{ type: 'search' }} />
            <IconButton aria-label="Account" size="small" onClick={handleClickOpen}> 
                <ManageAccountsIcon fontSize="inherit" /> 
            </IconButton>
            Hello!
      </header>

      <div class="Dialog">
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData).entries());
                const email = formJson.email;
                console.log(email);
                setEmail(email);
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
            <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;
