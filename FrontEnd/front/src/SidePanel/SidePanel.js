import './SidePanel.css';
import IconButton from '@mui/material/IconButton';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';

function SidePanel() {
  return (
    <div className="App">
      <header className="App-header">
          <div class="Menu-Button">
            <IconButton aria-label="delete" size="small"> 
                <InfoIcon fontSize="inherit" /> 
            </IconButton>
            Usefull Info
          </div>

          <div class="Menu-Button">
            <IconButton aria-label="delete" size="small"> 
                <LeaderboardIcon fontSize="inherit" /> 
            </IconButton>
            Leaderboard
          </div>

          <div class="Menu-Button">
            <IconButton aria-label="delete" size="small"> 
                <EmojiEventsIcon fontSize="inherit" /> 
            </IconButton>
            Achievements
          </div>
      </header>
    </div>
  );
}

export default SidePanel;
