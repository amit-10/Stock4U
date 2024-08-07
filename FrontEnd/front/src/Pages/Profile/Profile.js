import './Profile.css';
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
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../Context/auth.context';
import { getInvestorStatus, getUserPositionsHistory } from '../../Services/Backend.service';

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
  
  function createData(id, company, shares, type, profit, note ) {
    return { id, company, shares, type, profit, note };
  }

function Profile() {
    const [rows, setRows] = useState([]);
    const [bank, setBank] = useState(0);
    const [profit, setProfit] = useState(0);
    const [risk, setRisk] = useState('');

    const [auth] = useContext(authContext);

    const feedbacks = {
        NoFeedback: 'No feedback',
        Positive: 'Well done! You did well',
        RiskLevelMismatch: 'The risk level mismatch',
        ExitedTooEarly: 'Look like you exited too early...',
        ExitedTooLate: 'Look like you exited too late...',
        ShouldNotHaveEntered: 'You should not have entered'
    }

    useEffect(() => {
        async function getRows() {

            if (!auth || !auth.userId)
            {
                return;
            }

            try {
                const positionsHistoryResposne = await getUserPositionsHistory(auth.userId);
           
                const positionsHistory = positionsHistoryResposne.data;
                const positionsHistoryRows = positionsHistory.map(( {positionId, shareSymbol, sharesCount, positionType, entryPrice, exitPrice, positionFeedback }) => {
                    return createData(positionId, shareSymbol, sharesCount, positionType, (exitPrice - entryPrice).toFixed(2), positionFeedback);
                })
    
                setRows(positionsHistoryRows);
    
                const userInvestmentStatusResponse = await getInvestorStatus(auth.userId);
                const userInvestmentStatus = userInvestmentStatusResponse.data;
    
                setBank(userInvestmentStatus.accountBalance);
                setProfit(userInvestmentStatus.totalWorth);
                setRisk(userInvestmentStatus.riskLevel);
            } catch (e) {
                console.log(e);
            }
        };
    
        if (!rows.length)
        {
            getRows();
        }
      }, [auth]);

    return (
        <div className="App">
            <Typography color="#405D72" variant="h4" gutterBottom> Profile \ {auth.userId} </Typography>
            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                <div className="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Begginner Investor
                            </Typography>
                            <Typography variant="subtitle1" color="#405D72" component="div">
                                {risk} Risk Behavior
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>

                <div className="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Budget
                            </Typography>
                            <Typography variant="subtitle1" color="#405D72" component="div">
                                {bank}$
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>
              
                <div className="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px',  justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Shares Profit
                            </Typography>
                            <Typography variant="subtitle1" color="#405D72" component="div">
                                {profit}$
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>

            </div>
            <div style={{padding: '0 20px'}}>
                <div>
                    <Typography color="#405D72" variant="h6" gutterBottom> Positions History </Typography>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{backgroundColor: '#F7E7DC'}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell align="right">Company</StyledTableCell>
                                <StyledTableCell align="right">Shares</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                                <StyledTableCell align="right">Profit</StyledTableCell>
                                <StyledTableCell align="right">Note</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row"> {row.id} </StyledTableCell>
                                <StyledTableCell align="right">{row.company}</StyledTableCell>
                                <StyledTableCell align="right">{row.shares}</StyledTableCell>
                                <StyledTableCell align="right">{row.type}</StyledTableCell>
                                <StyledTableCell align="right">{row.profit}$</StyledTableCell>
                                <StyledTableCell align="right">{feedbacks[row.note]}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
}

export default Profile;
