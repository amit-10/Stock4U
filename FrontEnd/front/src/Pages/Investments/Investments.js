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
import { useDebounce } from 'use-debounce';
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Switch } from '@mui/material';
import { authContext } from '../../Context/auth.context';
import { getStockRiskLevel, getRealTimeStock, getInvestorStatus, enterPosition, closePosition, editStopLimit } from '../../Services/Backend.service';

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

function createData(id, symbol, shares, type, priceOfShare, difference, stopLimitPrice) {
    return { id, symbol, shares, type, priceOfShare, difference, stopLimitPrice };
}


function NewPositionDialog({ open, handleClose, userRiskLevel }) {
    const [symbolText, setSymbolText] = React.useState('');
    const [symbol] = useDebounce(symbolText, 500);
    const [amount, setAmount] = React.useState(0);
    const [symbolValid, setSymbolValid] = React.useState(false);
    const [symbolComment, setSymbolComment] = React.useState('');
    const [type, setType] = React.useState("Long");
    const [limitIsActive, setLimitIsActive] = React.useState(false);
    const [stopLimitPrice, setstopLimitPrice] = React.useState(-1);
    const [auth] = React.useContext(authContext);

    async function checkSymbol() {
        if (!!symbol) {
            try {
                const symbolRiskLevelResponse = await getStockRiskLevel(symbol);
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

    React.useEffect(() => { checkSymbol() }, [symbol]);

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

    async function enterNewPosition() {
        try {
            const stockResponse = await getRealTimeStock(symbol);
            const stockCurrentPrice = stockResponse.data.c;

            const body = {
                userId: auth.userId,
                position: {
                    positionId: (new Date()).toISOString(),
                    shareSymbol: symbol,
                    shareCategory: "",
                    entryPrice: stockCurrentPrice,
                    sharesCount: amount,
                    positionType: type,
                    entryTime: new Date(),
                    stopLimitPrice: limitIsActive === false ? -1 : stopLimitPrice
                }
            };

            console.log({ body })
            await enterPosition(body);
            close();
        }
        catch (e) {
            console.log('failed entering position', e);
        }

    }

    return <Dialog onClose={close} open={open}>
        <DialogTitle>New Position Parameters</DialogTitle>
        <div className='Dialog-Content'>
            <TextField label="Search Stocks" value={symbolText} onChange={changeSymbol} />
            <div style={{ height: '20px', color: symbolValid ? '#333333' : '#df3a3a' }}>{symbolComment}</div>
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
            <TextField onChange={(_, value) => setAmount(_.target.value)} label="Amount" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "20px" }}>
                <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>Activate Limit</Typography>
                <Switch value={limitIsActive} onChange={() => setLimitIsActive(prev => !prev)} />
            </div>
            {limitIsActive ?
                <>
                    <Typography>
                        If you want to limit the entry price for the position, select this option
                    </Typography>
                    <TextField label="Limit" inputProps={{ type: 'number', min: 0 }} onChange={(_, value) => setstopLimitPrice(_.target.value)} />
                </>
                : null}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: "40px" }}>
                <Button variant='contained' onClick={enterNewPosition}>Confirm</Button>
            </div>
        </div>
    </Dialog>
}

function ConfigurestopLimitPriceDialog({ open, handleClose, positionId }) {
    const [stopLimit, setStopLimit] = React.useState(-1);
    const [auth] = React.useContext(authContext);

    function close() {
        handleClose();
    }

    async function configureStopLimit() {
        try {
            const body = {
                userId: auth.userId,
                positionId: positionId,
                stopLimitPrice: stopLimit
            };
            console.log('body', body)
            await editStopLimit(body);
            close();
        } catch (e) {
            console.log('close position failed', e);
        }
    }

    async function resetStopLimit() {
        try {
            const body = {
                userId: auth.userId,
                positionId: positionId,
                stopLimitPrice: -1
            };
            console.log('body', body)
            await editStopLimit(body);
            close();
        } catch (e) {
            console.log('close position failed', e);
        }
    }

    return <Dialog onClose={close} open={open}>
        <DialogTitle>Configure Stop Limit</DialogTitle>
        <div className='Dialog-Content'>
            <Typography style={{ fontWeight: "bold", fontSize: "16px" }}>Stop Limit Value in USD</Typography>
            <TextField onChange={(_, value) => setStopLimit(_.target.value)} label="250$" />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: "40px" }}>
                <Button onClick={resetStopLimit} variant='contained'>Delete current Stop Limit</Button>
                <Button style={{ marginLeft: '10px' }} onClick={configureStopLimit} variant='contained'>Confirm</Button>
            </div>
        </div>
    </Dialog>
}

function ExitPositionDialog({ open, handleClose, positionId, symbol }) {
    const [amount, setAmount] = React.useState(0);
    const [auth] = React.useContext(authContext);

    function close() {
        handleClose();
    }

    async function closeOldPosition() {
        try {
            const stockResponse = await getRealTimeStock(symbol);
            const stockCurrentPrice = stockResponse.data.c;

            const body = {
                userId: auth.userId,
                positionId: positionId,
                closePrice: stockCurrentPrice,
                closeTime: new Date(),
                sharesCount: amount ?? 0,
            };
            console.log('body', body)
            await closePosition(body);
            close();
        } catch (e) {
            console.log('close position failed', e);
        }
    }

    return <Dialog onClose={close} open={open}>
        <DialogTitle>Exit Position</DialogTitle>
        <div className='Dialog-Content'>
            <TextField onChange={(_, value) => setAmount(_.target.value)} label="Amount" />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: "40px" }}>
                <Button onClick={closeOldPosition} variant='contained'>Confirm</Button>
            </div>
        </div>
    </Dialog>
}

function Investments() {
    const [newPositionOpen, setNewPositionOpen] = React.useState(false);
    const [exitPositionOpen, setExitPositionOpen] = React.useState(false);
    const [configurestopLimitPrice, setConfigurestopLimitPrice] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [bank, setBank] = React.useState(0);
    const [profit, setProfit] = React.useState(0);
    const [achievements, setAchievements] = React.useState(0);
    const [riskLevel, setRiskLevel] = React.useState('');
    const [auth] = React.useContext(authContext);
    const [selectedPositionId, setSelectedPositionId] = React.useState('');
    const [selectedSymbol, setSelectedSymbol] = React.useState('');

    async function getData() {
        if (!auth || !auth.userId) {
            return;
        }

        try {
            const userInvestmentStatusResponse = await getInvestorStatus(auth.userId);
            const userInvestmentStatus = userInvestmentStatusResponse.data;
            let userPositions = [];

            for (let { positionId, shareSymbol, entryPrice, sharesCount, positionType, stopLimitPrice } of userInvestmentStatus.positions) {
                const stockResponse = await getRealTimeStock(shareSymbol);
                const stockCurrentPrice = stockResponse.data.c;
                const difference = ((stockCurrentPrice - entryPrice) / entryPrice) * 100;

                userPositions.push(createData(positionId, shareSymbol, sharesCount, positionType, entryPrice, difference.toFixed(2), stopLimitPrice));
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

    React.useEffect(() => { getData() }, [refresh, auth]);

    function closeNewPosition() {
        setNewPositionOpen(false)
        setRefresh(prev => !prev);
    }

    function closeExitPosition() {
        setExitPositionOpen(false)
        setRefresh(prev => !prev);
    }

    function closeConfigureStopLimit() {
        setConfigurestopLimitPrice(false);
        setRefresh(prev => !prev);
    }

    function onConfigureStopLimit(show, rowId) {
        setConfigurestopLimitPrice(show);
        setSelectedPositionId(rowId);
    }

    function onClosePosition(positionId, symbol) {
        setExitPositionOpen(true);
        setSelectedPositionId(positionId);
        setSelectedSymbol(symbol);
    }

    return <div className="App">
        <Typography color="#405D72" variant="h4" gutterBottom> Investments </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
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
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
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

            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Achievements
                            </Typography>
                            <Typography variant="subtitle1" color="#405D72" component="div">
                                {achievements}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

        </div>
        <div style={{ padding: '0 20px' }}>
            <div>
                <Typography color="#405D72" variant="h6" gutterBottom>My Positions</Typography>
            </div>
            <TableContainer component={Paper} sx={{ backgroundColor: '#F7E7DC' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Symbol</StyledTableCell>
                            <StyledTableCell align="right">Shares</StyledTableCell>
                            <StyledTableCell align="right">Entry Price per Share</StyledTableCell>
                            <StyledTableCell align="right">Type</StyledTableCell>
                            <StyledTableCell align="right">Difference</StyledTableCell>
                            <StyledTableCell align="right">Stop Limit Value</StyledTableCell>
                            <StyledTableCell align="right" sx={{ color: '#405D72' }}>
                                <Button color='inherit' variant='contained' onClick={() => setNewPositionOpen(true)}>Enter New Position</Button>
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
                                            <TrendingDown style={{ color: row.type?.toLowerCase() == 'short' ? 'green' : '#df3a3a' }} /> :
                                            <TrendingUp style={{ color: row.type?.toLowerCase() == 'short' ? '#df3a3a' : 'green' }} />}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.stopLimitPrice === -1 ?
                                        <>
                                            <Button size="small" variant='outlined' onClick={() => onConfigureStopLimit(true, row.id)}>Configure a Stop Limit value</Button>
                                        </>
                                        :
                                        <>
                                            <div>{row.stopLimitPrice}$</div>
                                            <Button size="small" variant='outlined' onClick={() => onConfigureStopLimit(true, row.id)}>Reonfigure Stop Limit value</Button>
                                        </>
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button sx={{ backgroundColor: '#405D72' }} variant='contained' onClick={() => onClosePosition(row.id, row.symbol)}>Exit Position</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <NewPositionDialog open={newPositionOpen} handleClose={closeNewPosition} />
        <ExitPositionDialog open={exitPositionOpen} handleClose={closeExitPosition} positionId={selectedPositionId} symbol={selectedSymbol} />
        <ConfigurestopLimitPriceDialog open={configurestopLimitPrice} handleClose={closeConfigureStopLimit} positionId={selectedPositionId} />
    </div>;
}

export default Investments;