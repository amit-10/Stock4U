import './Statistics.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../Context/auth.context';
import { AgChartsReact } from 'ag-charts-react';
import { getInvestorStatus, getStockHistory, getRealTimeStock } from '../../Services/Backend.service';

function Statistics() {
    const [bank, setBank] = useState(0);
    const [risk] = useState('');
    const [positions, setPositions] = useState([]);
    const [achievements, setAchievements] = useState(0);
    const [auth] = useContext(authContext);
    const [chartOptions, setChartOptions] = useState({});
    const [donutOptions, setDonutOptions] = useState({});
    const daysBack = 7;
    const intervalCheckMS = 60000 // 60 seconds

    const [options, setOptions] = useState({});

    setInterval(async () => {
        try {
            if (!auth || !auth.userId)
            {
                return;
            }
    
            const statusResponse = await getInvestorStatus(auth.userId);
            const status = statusResponse.data;
            const achievemnets = status.achievementsPoints;
            setAchievements(achievemnets);
            setBank(status.accountBalance);
        }
        catch (e)
        {
            console.log('failed interval updating user data', e);
        }
       
    }, intervalCheckMS);

    async function handleOnButtonClick(shareSymbol)
    {
        try {
            const historyResponse = await getStockHistory(shareSymbol, daysBack);
            const historyPrice = historyResponse.data;
    
            const newLineDate = [];
    
            Object.keys(historyPrice).forEach(key => {
                console.log(key);
                newLineDate.push({
                    date: key,
                    shareProfit: historyPrice[key].closePrice
                })
            });
    
            const newOptions = {
                title: {
                  text: `Share ${shareSymbol} Over Time`,
                },
                data: newLineDate,
                series: [
                  {
                    type: "line",
                    xKey: "date",
                    yKey: "shareProfit",
                    yName: "profit"
                  }
                ],
              }
    
              setOptions(newOptions);
        } catch (e) {
            console.log('failed getting history', e);
        }
    }

    useEffect(() => {
        async function getPositions() {
            if (!auth || !auth.userId)
            {
                return;
            }

            try {
                const userInvestmentStatusResponse = await getInvestorStatus(auth.userId);
                const userInvestmentStatus = userInvestmentStatusResponse.data;
    
                const newRows = [];
                userInvestmentStatus.positions.forEach(async position => {
                    const realTimeResponse = await getRealTimeStock(position.shareSymbol);
                    const realTimeValue = realTimeResponse.data;

                    const newLineDate = [];

                    const historyResponse = await getStockHistory(position.shareSymbol, daysBack);
                    const historyPrice = historyResponse.data;

                    Object.keys(historyPrice).forEach(key => {
                        newLineDate.push({ date: key, shareProfit: historyPrice[key].closePrice });
                    });

                    const newOptions = {
                        title: {
                          text: `Share ${position.shareSymbol} Over Time`,
                        },
                        data: newLineDate,
                        series: [
                          {
                            type: "line",
                            xKey: "date",
                            yKey: "shareProfit",
                            yName: "profit"
                          }
                        ],
                      };

                      const newDonutOptions = {
                        data: newLineDate,
                        title: {
                          text: 'Profits Per Day',
                        },
                        series: [
                          {
                            type: "donut",
                            calloutLabelKey: "date",
                            angleKey: "shareProfit",
                            innerRadiusRatio: 0.7,
                          },
                        ],
                      };

                    setOptions(newOptions);
                    setDonutOptions(newDonutOptions);

                    newRows.push({
                        shareKey: position.shareSymbol,
                        sharesCount: realTimeValue.c - position.entryPrice
                    });

                    setChartOptions({   title: {
                        text: "Profits per share",
                      }, data: newRows, series: [{ type: 'bar', xKey: 'shareKey', yKey: 'sharesCount' }] })
                });

                setPositions(userInvestmentStatus.positions);
            } catch (e) {
                console.log(e);
            }
        };

        if (!positions.length)
        {
            getPositions();
        }

      }, [auth]);


    return (
        <div className="App">
            <Typography color="#405D72" variant="h4" gutterBottom> Statistics </Typography>
            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                <div class="Card">
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

                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Bank
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
              
                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px',  justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Achievements
                            </Typography>
                            <Typography variant="subtitle1" color="#405D72" component="div">
                                {achievements} Points
                            </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            </Box>
                        </Box>
                    </Card>
                </div>

            </div>

            <div class="charts-sections1">
                {positions.map(position => <Button onClick={() => handleOnButtonClick(position.shareSymbol)}>{position.shareSymbol}</Button>)}
                <AgChartsReact options={options} />
            </div>
            <div class="graphs">
                <div class="charts-sections2">
                    <AgChartsReact options={chartOptions} />
                </div>
                <div class="charts-sections3">
                        <AgChartsReact options={donutOptions} />
                </div>
            </div>
        </div>
    );

}

export default Statistics;