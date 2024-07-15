import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../Context/auth.context';
import { getUserAchievements } from '../Services/Backend.service';
import { styled } from '@mui/material';

function SidePanel() {

  const [achievements, setAchievements] = useState([]);
  const [auth] = useContext(authContext);
  
  useEffect(() => {
    async function getAchivements() {
        if (!auth || !auth.userId)
        {
            return;
        }
      
        try {
            const achievementsResponse = await getUserAchievements(auth.userId);
            setAchievements(achievementsResponse.data);
        } catch (e) {
            console.log(e);
        }
      
    };
    if (!achievements.length)
    {
      getAchivements();
    }
  }, [auth]);

  return (
    <Container>
      <div>
        <UsefullInfo>
            <Typography variant="h6" gutterBottom> Usefull Info </Typography>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom> A share jumped in 5% </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 5 minutes ago </Typography>
                </UpdateDate>
              </div>
            </Item>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom>A share jumped in 2.5% </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 16 minutes ago </Typography>
                </UpdateDate>
              </div>
            </Item>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom>Jeff Bezos said "..." </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 8 hours ago </Typography>
                </UpdateDate>
              </div>
            </Item>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom>You've completed </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 12 hours ago</Typography>
                </UpdateDate>
              </div>
            </Item>
        </UsefullInfo>

        <div style={{paddingTop: '30px'}}>
            <Typography variant="h6" gutterBottom> Leaderboard </Typography>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom> Amit Cohen </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1256# </Typography>
                </UpdateDate>
              </div>
            </Item>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom>Elor Sulimani </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1257# </Typography>
                </UpdateDate>
              </div>
            </Item>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom>Lior Zioni </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1258# </Typography>
                </UpdateDate>
              </div>
            </Item>

            <Item>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom>Itay Aviran</Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom> 1259# </Typography>
                </UpdateDate>
              </div>
            </Item>

        </div>
          
        <div style={{paddingTop: '30px'}}>

            <Typography variant="h6" gutterBottom> Achievements </Typography>

            {achievements.map((achivement, index) =>  <Item key={index}>
              <Avatar sx={{ width: 30, height: 30, marginRight: '10px' }}/>
              <div>
                <Typography variant="h8" gutterBottom> {achivement.achievementType} </Typography>
                <UpdateDate>
                  <Typography sx={{ width: 10, height: 10, marginRight: '10px' }}  variant="h10" gutterBottom>  {(new Date(achivement.achievedTime)).toLocaleDateString()} </Typography>
                </UpdateDate>
              </div>
            </Item>)}
        </div>
      </div>
    </Container>
  );
}

const Container = styled('div')`
  text-align: center;
  border-left: solid 2px #F7E7DC;
  height: 100%;
`

const UsefullInfo = styled('div')`
  padding-top: 30px;
  flex-direction: column;
  display: flex;
  font-size: 15px;
`

const Item = styled('div')`
  display: flex;
  padding: 10px;
`

const UpdateDate = styled('div')`
  font-size: 11px;
  position: absolute;
`

export default SidePanel;
