using Backend.Common.Interfaces;
using Backend.Common.Models.InvestingAdvisor;
using Backend.InvestingAdvisor.Interfaces;
using Backend.InvestingAdvisor.Models;
using Mapster;

namespace Backend.InvestingAdvisor.Lib;

public class StockRiskClassifier(IStockPriceRetriever stockPriceRetriever) : IStockRiskClassifier
{
    public async Task<RiskLevel> GetStockRiskLevelAsync(string symbol, int daysBack)
    {
        var historyData = await stockPriceRetriever.GetStockHistoryAsync(symbol, daysBack);
        var financialOverview = await stockPriceRetriever.GetStockFinancialOverviewAsync(symbol);

        var closePriceHistory = historyData.ToDictionary(dailyData =>
            DateTime.Parse(dailyData.Key), dailyData => dailyData.Value.ClosePrice);

        var volatility = StatisticsCalculator.CalculateVolatility(closePriceHistory);
        var averageReturn = StatisticsCalculator.CalculateAverageReturn(closePriceHistory);
        var maxDrawdown = StatisticsCalculator.CalculateMaxDrawdown(closePriceHistory);

        RiskLevel riskLevel;
        if (financialOverview.Symbol is null)
        {
            riskLevel = ClassifyEtf(volatility, averageReturn, maxDrawdown);
        }
        else
        {
            var stockClassificationData = financialOverview.Adapt<StockClassificationData>();
            riskLevel = ClassifyStock(volatility, averageReturn, maxDrawdown, stockClassificationData);
        }

        return riskLevel;
    }

    private static RiskLevel ClassifyEtf(double volatility, double averageReturn, double maxDrawdown)
    {
        if (volatility > 0.3 || maxDrawdown > 0.4)
        {
            return RiskLevel.High;
        }

        if (volatility > 0.2 || maxDrawdown > 0.3 || averageReturn < 0.05)
        {
            return RiskLevel.Medium;
        }

        return RiskLevel.Low;
    }

    private static RiskLevel ClassifyStock(double volatility, double averageReturn, double maxDrawdown,
        StockClassificationData stockClassificationData)
    {
        if (volatility > 0.3 || maxDrawdown > 0.4 || stockClassificationData.Beta > 1.5 ||
            stockClassificationData.Roe < 10 || stockClassificationData.PeRatio > 25 ||
            stockClassificationData.PbRatio > 3 || stockClassificationData.DividendYield < 1 || averageReturn < 0.05)
        {
            return RiskLevel.High;
        }

        if (volatility > 0.2 || maxDrawdown > 0.3 || stockClassificationData.Beta > 1.0 ||
            stockClassificationData.Roe < 15 || stockClassificationData.PeRatio > 20 ||
            stockClassificationData.PbRatio > 2 || stockClassificationData.DividendYield < 2 || averageReturn < 0.10)
        {
            return RiskLevel.Medium;
        }

        return RiskLevel.Low;
    }
}