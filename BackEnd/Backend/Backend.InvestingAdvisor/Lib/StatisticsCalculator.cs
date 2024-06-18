namespace Backend.InvestingAdvisor.Lib;

public static class StatisticsCalculator
{
    public static double CalculateVolatility(Dictionary<DateTime, double> closePriceHistory)
    {
        var returns = CalculateReturns(closePriceHistory);
        var mean = returns.Sum() / returns.Count;
        var variance = returns.Sum(r => Math.Pow(r - mean, 2)) / returns.Count;
        var volatility = Math.Sqrt(variance) * Math.Sqrt(252); // Annualized volatility
        
        return volatility;
    }

    public static double CalculateAverageReturn(Dictionary<DateTime, double> closePriceHistory)
    {
        var returns = CalculateReturns(closePriceHistory);
        var averageReturn = returns.Sum() / returns.Count;
        return averageReturn * 252; // Annualized average return
    }

    public static double CalculateMaxDrawdown(Dictionary<DateTime, double> closePriceHistory)
    {
        var dates = closePriceHistory.Keys.ToList();
        dates.Sort();

        double maxDrawdown = 0;
        var peak = closePriceHistory[dates[0]];

        foreach (var date in dates)
        {
            var price = closePriceHistory[date];
            if (price > peak)
            {
                peak = price;
            }
            var drawdown = (peak - price) / peak;
            if (drawdown > maxDrawdown)
            {
                maxDrawdown = drawdown;
            }
        }

        return maxDrawdown;
    }
    
    private static List<double> CalculateReturns(Dictionary<DateTime, double> closePriceHistory)
    {
        var returns = new List<double>();
        var dates = closePriceHistory.Keys.ToList();
        dates.Sort();
        
        for (var i = 1; i < dates.Count; i++)
        {
            var prevClose = closePriceHistory[dates[i - 1]];
            var currClose = closePriceHistory[dates[i]];
            var dailyReturn = (currClose - prevClose) / prevClose;
            returns.Add(dailyReturn);
        }

        return returns;
    }
}