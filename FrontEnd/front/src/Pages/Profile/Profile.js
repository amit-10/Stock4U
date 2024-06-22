import './Profile.css';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [bank, setBank] = useState(0);
    const [profit, setProfit] = useState(0);


    useEffect(() => {
        async function getRows() {
            try {
                const positionsHistoryResposne = await axios.get('http://localhost:5266/Positions/GetUserPositionsHistory?userId=aaa');
           
                const positionsHistory = positionsHistoryResposne.data;
                const positionsHistoryRows = positionsHistory.map(( {positionId, shareSymbol, sharesCount, positionType, entrancePrice, closePrice }) => {
                    return createData(positionId, shareSymbol, sharesCount, positionType, closePrice - entrancePrice);
                })
    
                setRows(positionsHistoryRows);
    
                // const userInvestmentStatusResponse = await axios.get('http://localhost:5266/Positions/GetUserInvestmentStatus?userId=aaa');
                // const userInvestmentStatus = userInvestmentStatusResponse.data;
                // const currentBalance = userInvestmentStatus.AccountBalance;
                // let totalPrices = 0;
                // const entryPrices = userInvestmentStatus.Positions.foreach(position => totalPrices += position.EntryPrice);
    
                // const profit = currentBalance - totalPrices;
                // setBank(currentBalance);
                // setProfit(profit);
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
            <Typography color="#545f71" variant="h6" gutterBottom> Profile \ Elor Sulimani </Typography>
            <div class="Card-Section">
                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Begginner Investor
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                Low Risk / High Risk Behavior
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
                                Bank
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                {bank}
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
                                {profit}
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
                    Positions History
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
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
                                <StyledTableCell align="right">{row.note}</StyledTableCell>
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
