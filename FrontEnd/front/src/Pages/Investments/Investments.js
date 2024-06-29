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
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
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

function createData(id, symbol, shares, type, priceOfShare, difference) {
    return { id, symbol, shares, type, priceOfShare, difference };
}

function NewPositionDialog({open, handleClose, userRiskLevel}) {
    const [symbolText, setSymbolText] = React.useState('');
    const [symbol] = useDebounce(symbolText, 500);
    const [symbolValid, setSymbolValid] = React.useState(false);
    const [symbolComment, setSymbolComment] = React.useState('');
    const [type, setType] = React.useState("Long");
    const [limitIsActive, setLimitIsActive] = React.useState(false);

    async function checkSymbol() {
        if (!!symbol) {
            try {
                const symbolRiskLevelResponse = await axios.get(`http://localhost:5266/InvestingAdvisor/GetStockRiskLevel?symbol=${symbol}`);
                const symbolRiskLevel = symbolRiskLevelResponse.data;
                setSymbolValid(true)
                if (symbolRiskLevel.toLowerCase() === userRiskLevel.toLowerCase()) {
                    setSymbolComment('Matches your risk management preferences');
                } else {
                    setSymbolComment('Symbol does not match your risk preferences');
                }
            } catch (e) {
                setSymbolValid(false);
                setSymbolComment('Symbol does not exist in our system');
            }
        }
    }

    React.useEffect(() => {checkSymbol()}, [symbol]);

    function changeSymbol(event) {
        setSymbolValid(false);
        setSymbolComment('');
        setSymbolText(event.target.value);
    }

    function close() {
        setType("Long");
        setSymbolComment('');
        setLimitIsActive(false);
        handleClose();
    }

    function enterPosition() {
        close();
    }

    return <Dialog onClose={close} open={open}>
        <DialogTitle>New Position Parameters</DialogTitle>
        <div className='Dialog-Content'>
            <TextField label="Search Stocks" value={symbolText} onChange={changeSymbol}/>
            <div style={{height: '20px', color: symbolValid ? '#333333' : '#df3a3a'}}>{symbolComment}</div>
            <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(_, value) => setType(value)}
            >
                <ToggleButton value="Long">
                    LONG
                </ToggleButton>
                <ToggleButton value="Short">
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
                <Button variant='contained' onClick={enterPosition}>Confirm</Button>
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
    const [refresh, setRefresh] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [bank, setBank] = React.useState(0);
    const [profit, setProfit] = React.useState(0);
    const [achievements, setAchievements] = React.useState(0);
    const [riskLevel, setRiskLevel] = React.useState('');

    async function getData() {
        try {
            const userInvestmentStatusResponse = await axios.get('http://localhost:5266/Positions/GetUserInvestmentStatus?userId=aaa');
            const userInvestmentStatus = userInvestmentStatusResponse.data;
            let userPositions = [];

            for (let {positionId, shareSymbol, entryPrice, sharesCount, positionType} of userInvestmentStatus.positions) {
                const stockResponse = await axios.get(`http://localhost:5266/Stocks/GetRealTimeStock?symbol=${shareSymbol}`);
                const stockCurrentPrice = stockResponse.data.c;
                const difference = ((stockCurrentPrice - (entryPrice/sharesCount)) / (entryPrice/sharesCount)) * 100;

                userPositions.push(createData(positionId, shareSymbol, sharesCount, positionType, (entryPrice/sharesCount).toFixed(2), difference.toFixed(2)));
            }

            setRows(userPositions);
            setBank(userInvestmentStatus.accountBalance);
            setProfit(userInvestmentStatus.totalWorth);
            setAchievements(userInvestmentStatus.achievementsCount);
            setRiskLevel(userInvestmentStatus.riskLevel)
        } catch (e) {
            console.log(e);
        }
    }

    React.useEffect(() => {getData()}, [refresh]);

    function closeNewPosition() {
        setNewPositionOpen(false)
        setRefresh(prev => !prev);
    }

    function closeExitPosition() {
        setExitPositionOpen(false)
        setRefresh(prev => !prev);
    }

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
                                {bank}$
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
                                {profit}$
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
                                {achievements}
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
                            <StyledTableCell align="right">Symbol</StyledTableCell>
                            <StyledTableCell align="right">Shares</StyledTableCell>
                            <StyledTableCell align="right">Entry Price per Share</StyledTableCell>
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
                                <StyledTableCell align="right">{row.symbol}</StyledTableCell>
                                <StyledTableCell align="right">{row.shares}</StyledTableCell>
                                <StyledTableCell align="right">{row.priceOfShare}$</StyledTableCell>
                                <StyledTableCell align="right">{row.type}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className='Difference'>
                                        {Math.abs(row.difference)}%
                                        {row.difference < 0 ? 
                                            <TrendingDown style={{color: row.type?.toLowerCase() == 'short' ? 'green' : '#df3a3a'}}/> : 
                                            <TrendingUp style={{color: row.type?.toLowerCase() == 'short' ? '#df3a3a' : 'green'}}/>}
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
        <NewPositionDialog open={newPositionOpen} handleClose={closeNewPosition}/>
        <ExitPositionDialog open={exitPositionOpen} handleClose={closeExitPosition}/>
    </div>;
}

export default Investments;