import './Menu.css';
import IconButton from '@mui/material/IconButton';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';


function Menu() {
  return (
    <div className="App">
      <header className="App-header">

          <div class="Menu-Button">
            <Avatar sx={{cursor: 'pointer'}} title="Profile" component={Link} to="/profile"/>
          </div>

          <div class="Menu-Button">
            <IconButton component={Link} to="/"> 
                <SignalCellularAltRoundedIcon/> 
            </IconButton>
            Statistics
          </div>

          <div class="Menu-Button">
            <IconButton component={Link} to="/investments"> 
                <PaidOutlinedIcon/> 
            </IconButton>
            Investments
          </div>

          <div class="Menu-Button">
            <IconButton component={Link} to="/leaderboard"> 
                <AssignmentOutlinedIcon/> 
            </IconButton>
            Leaderboard
          </div>
      </header>
    </div>
  );
}

export default Menu;
