import './SidePanel.css';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function SidePanel() {
  return (
    <div className="App">
      <div class="Items">
        <div class="Usefull-Info">
            <Typography variant="h6" gutterBottom> Usefull Info </Typography>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom> A share jumped in 5% </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 5 minutes ago </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>A share jumped in 2.5% </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 16 minutes ago </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>Jeff Bezos said "..." </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 8 hours ago </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>You've completed </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 12 hours ago</Typography>
                </div>
              </div>
            </div>
        </div>

        <div class="Leaderboard">
            <Typography variant="h6" gutterBottom> Leaderboard </Typography>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom> Amit Cohen </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1256# </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>Elor Sulimani </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1257# </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>Lior Zioni </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1258# </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>Itay Aviran</Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1259# </Typography>
                </div>
              </div>
            </div>

        </div>
          
        <div class="Achievements">
            <Typography variant="h6" gutterBottom> Achievements </Typography>
            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom> A share jumped in 5% </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 5 minutes ago </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>A share jumped in 2.5% </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 16 minutes ago </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>Jeff Bezos said "..." </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 8 hours ago </Typography>
                </div>
              </div>
            </div>

            <div class="Item">
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div class="Item-Description">
                <Typography variant="h8" gutterBottom>You've completed </Typography>
                <div class="Update-Date">
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 12 hours ago</Typography>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
