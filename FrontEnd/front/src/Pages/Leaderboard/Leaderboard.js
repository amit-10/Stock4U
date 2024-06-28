import './Leaderboard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../Context/auth.context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
  }));
  
  function createData(position, name, achievements, profit) {
    return { position, name, achievements, profit };
  }

function Leaderboard() {
    const [rows, setRows] = useState([]);
    const [bank, setBank] = useState(0);
    const [profit, setProfit] = useState(0);
    const [position, setPosition] = useState(0);
    const [achievements, setAchievements] = useState(0);

    const [auth,setAuth] = useContext(authContext);

    useEffect(() => {
        async function getRows() {
            try {
                const leaderboardResposne = await axios.get('http://localhost:5266/Positions/GetTopTenUsers');
           
                const leaderboard = leaderboardResposne.data;

                const leaderboardRows = leaderboard.map(( {userId, achievementsPoints, totalWorth }, index) => {
                    console.log(index);
                    return createData(index, userId, achievementsPoints, totalWorth);
                });

                console.log({leaderboardRows});
    
                setRows(leaderboardRows);
    
                const userInvestmentStatusResponse = await axios.get('http://localhost:5266/Positions/GetUserInvestmentStatus?userId=aaa');
                const userInvestmentStatus = userInvestmentStatusResponse.data;
    
                setBank(userInvestmentStatus.accountBalance);
                setProfit(userInvestmentStatus.totalWorth);
                setAchievements(userInvestmentStatus.achievementsPoints);
            } catch (e) {
                console.log(e);
            }
          
        };
    
        if (!rows.length)
        {
            getRows();
        }
      }, []);

    return (
        <div className="App">
            <Typography color="#545f71" variant="h6" gutterBottom> Profile \ {auth.email} </Typography>
            <div class="Card-Section">
                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Achievements
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                {achievements} Points
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>

                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Position
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                {position}#
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>
              
                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px',  justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Shares Profit
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                {profit}$
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>

            </div>
            <div class="Positions-History">
                <div class="Positions-History-Title">
                    <Typography color="#545f71" variant="h6" gutterBottom>Leaderboard </Typography>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Position</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Achievements</StyledTableCell>
                                <StyledTableCell align="right">Profit</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.position}>
                                <StyledTableCell component="th" scope="row"> {row.position} </StyledTableCell>
                                <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                                <StyledTableCell align="right">{row.achievements}</StyledTableCell>
                                <StyledTableCell align="right">{row.profit}$</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
}

export default Leaderboard;
