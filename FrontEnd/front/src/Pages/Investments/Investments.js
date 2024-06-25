import './Investments.css';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Switch } from '@mui/material';

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

function createData(id, company, shares, type, priceOfShare, difference) {
    return { id, company, shares, type, priceOfShare, difference };
}

const rows = [
    createData('#1', 'Tesla', 500, "LONG", 1.02, 2.47),
    createData('#2', 'Amazon', 450, "LONG", 2.16, -0.56),
    createData('#3', 'Google', 700, "SHORT", 1.13, -13.65),
    createData('#4', 'Microsoft', 630, "LONG", 2.04, 1.98),
    createData('#5', 'Meta', 800, "LONG", 0.91, -3.47)
];

const stockOptions = [
    {label: 'Tesla', recommend: 'Based on Your Behavior'},
    {label: 'Meta', recommend: 'Based on Your Preferences'}
]

function NewPositionDialog({open, handleClose}) {
    const [type, setType] = React.useState("LONG");
    const [limitIsActive, setLimitIsActive] = React.useState(false)

    function close() {
        setType("LONG");
        setLimitIsActive(false);
        handleClose();
    }

    return <Dialog onClose={close} open={open}>
        <DialogTitle>New Position Parameters</DialogTitle>
        <div className='Dialog-Content'>
            <Autocomplete
                disablePortal
                options={stockOptions}
                renderInput={(params) => <TextField {...params} label="Search Stocks"/>}
            />
            <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(_, value) => setType(value)}
            >
                <ToggleButton value="LONG">
                    LONG
                </ToggleButton>
                <ToggleButton value="SHORT">
                    SHORT
                </ToggleButton>
            </ToggleButtonGroup>
            <TextField label="Amount"/>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "20px"}}>
                <Typography style={{fontWeight: "bold", fontSize: "16px"}}>Activate Limit</Typography>
                <Switch value={limitIsActive} onChange={() => setLimitIsActive(prev => !prev)}/>
            </div>
            <Typography>
                If you want to limit the entry price for the position, select this option
            </Typography>
            <TextField label="Limit"/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: "40px"}}>
                <Button variant='contained'>Confirm</Button>
            </div>
        </div>
    </Dialog>
}

function ExitPositionDialog({open, handleClose}) {
    const [limitIsActive, setLimitIsActive] = React.useState(false)

    function close() {
        setLimitIsActive(false);
        handleClose();
    }

    return <Dialog onClose={close} open={open}>
        <DialogTitle>Exit Position</DialogTitle>
        <div className='Dialog-Content'>
            <TextField label="Amount"/>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "20px"}}>
                <Typography style={{fontWeight: "bold", fontSize: "16px"}}>Activate Limit</Typography>
                <Switch value={limitIsActive} onChange={() => setLimitIsActive(prev => !prev)}/>
            </div>
            <Typography>
                If you want to limit the exit price for the position, select this option
            </Typography>
            <TextField label="Limit"/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: "40px"}}>
                <Button variant='contained'>Confirm</Button>
            </div>
        </div>
    </Dialog>
}

function Investments() {
    const [newPositionOpen, setNewPositionOpen] = React.useState(false);
    const [exitPositionOpen, setExitPositionOpen] = React.useState(false);

    return <div className="App">
        <Typography color="#545f71" variant="h6" gutterBottom> Investments </Typography>
        <div class="Card-Section">
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
                <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
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

            <div class="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Achievements
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                28
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

        </div>
        <div class="My-Positions">
            <div class="My-Positions-Title">
                My Positions
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Company</StyledTableCell>
                            <StyledTableCell align="right">Shares</StyledTableCell>
                            <StyledTableCell align="right">Price/Share</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Difference</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant='contained' onClick={() => setNewPositionOpen(true)}>Enter New Position</Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row"> {row.id} </StyledTableCell>
                                <StyledTableCell align="right">{row.company}</StyledTableCell>
                                <StyledTableCell align="right">{row.shares}</StyledTableCell>
                                <StyledTableCell align="right">{row.priceOfShare}$</StyledTableCell>
                                <StyledTableCell align="right">{row.type}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className='Difference'>
                                        {Math.abs(row.difference)}%
                                        {row.difference < 0 ? <TrendingDown /> : <TrendingUp />}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant='contained' onClick={() => setExitPositionOpen(true)}>Exit Position</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <NewPositionDialog open={newPositionOpen} handleClose={() => setNewPositionOpen(false)}/>
        <ExitPositionDialog open={exitPositionOpen} handleClose={() => setExitPositionOpen(false)}/>
    </div>;
}

export default Investments;