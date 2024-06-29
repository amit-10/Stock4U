import './Statistics.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../Context/auth.context';
import { AgChartsReact } from 'ag-charts-react';
import axios from 'axios';

function Statistics() {
    const [bank, setBank] = useState(0);
    const [risk] = useState('');
    const [positions, setPositions] = useState([]);
    const [achievements, setAchievements] = useState(0);
    const [auth] = useContext(authContext);
    const [chartOptions, setChartOptions] = useState({});
    const [donutOptions, setDonutOptions] = useState({});
    const daysBack = 7;

    const [options, setOptions] = useState({});

    setInterval(async () => {
        if (!auth || !auth.userId)
        {
            return;
        }

        const statusResponse = await axios.get(`http://localhost:5266/Positions/GetUserInvestmentStatus?userId=${auth.userId}`);
        const status = statusResponse.data;
        const achievemnets = status.achievementsPoints;
        setAchievements(achievemnets);
        setBank(status.accountBalance);
    }, 10000);

    async function handleOnButtonClick(shareSymbol)
    {
        const historyResponse = await axios.get(`http://localhost:5266/Stocks/GetStockHistory?symbol=${shareSymbol}&daysBack=${daysBack}`);
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
    }

    useEffect(() => {
        async function getPositions() {
            if (!auth || !auth.userId)
            {
                return;
            }

            try {
                const userInvestmentStatusResponse = await axios.get(`http://localhost:5266/Positions/GetUserInvestmentStatus?userId=${auth.userId}`);
                const userInvestmentStatus = userInvestmentStatusResponse.data;
    
                const newRows = [];
                userInvestmentStatus.positions.forEach(async position => {
                    const realTimeResponse = await axios.get(`http://localhost:5266/Stocks/GetRealTimeStock?symbol=${position.shareSymbol}`);
                    const realTimeValue = realTimeResponse.data;
                    console.log(position);

                    const newLineDate = [];

                    const historyResponse = await axios.get(`http://localhost:5266/Stocks/GetStockHistory?symbol=${position.shareSymbol}&daysBack=${daysBack}`);
                    const historyPrice = historyResponse.data;

                    Object.keys(historyPrice).forEach(key => {
                        console.log(key);
                        newLineDate.push({
                            date: key,
                            shareProfit: historyPrice[key].closePrice
                        })
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
                      }

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
                      }

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
            <Typography color="#545f71" variant="h6" gutterBottom> Today </Typography>
            <div class="Card-Section">
                <div class="Card">
                    <Card sx={{ display: 'flex', backgroundColor: '#dadada', color: '#545f71', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Begginner Investor
                            </Typography>
                            <Typography variant="subtitle1" color="#545f71" component="div">
                                {risk} Risk Behavior
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
                                {bank}$
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

// const root = createRoot(document.getElementById('root'));
// root.render(<ChartExample />);

export default Statistics;