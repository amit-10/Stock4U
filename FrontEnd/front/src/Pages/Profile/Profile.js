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
import { AppContext } from '../../AppContext';

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
  
  const rows = [
    createData('#1', 'Tesla', 500, "LONG", -1.02, 'You shouldnt have entered this position'),
    createData('#2', 'Amazon', 450, "LONG", 2.16, 'Congratulations! good choice'),
    createData('#3', 'Google', 700, "SHORT", 1.13, 'Youve exisited the position too early'),
    createData('#4', 'Microsoft', 630, "LONG", -2.04, 'You shouldnt have entered this position'),
    createData('#5', 'Meta', 800, "LONG", 0.91, 'You shouldnt have entered this position')
  ];

function Profile() {
    const theme = useTheme();
    const user = React.useContext(AppContext);

    return (
        <div className="App">
            <Typography color="#545f71" variant="h6" gutterBottom> Profile \ {user.email} </Typography>
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
                                10K
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
                                7K
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>

            </div>
            <div class="Positions-History">
                <Typography color="#545f71" variant="h6" gutterBottom> Positions History </Typography>
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
