import './Menu.css';
import IconButton from '@mui/material/IconButton';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Avatar from '@mui/material/Avatar';


function Menu() {
  return (
    <div className="App">
      <header className="App-header">

          <div class="Menu-Button">
            <Avatar title="Profile" />
          </div>

          <div class="Menu-Button">
            <IconButton aria-label="delete" size="small"> 
                <SignalCellularAltRoundedIcon fontSize="inherit" /> 
            </IconButton>
            Statistics
          </div>

          <div class="Menu-Button">
            <IconButton aria-label="delete" size="small"> 
                <PaidOutlinedIcon fontSize="inherit" /> 
            </IconButton>
            Investments
          </div>

          <div class="Menu-Button">
            <IconButton aria-label="delete" size="small"> 
                <AssignmentOutlinedIcon fontSize="inherit" /> 
            </IconButton>
            Leaderboard
          </div>
      </header>
    </div>
  );
}

export default Menu;
