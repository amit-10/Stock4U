using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Interfaces.Stocks;
using Backend.Common.Models.InvestingAdvisor;
using Backend.InvestingAdvisor.Lib.Utils;
using Backend.InvestingAdvisor.Models;
using Mapster;

namespace Backend.InvestingAdvisor.Lib.StocksRiskClassification;

public class StockRiskClassifier(IStockPriceRetriever stockPriceRetriever) : IStockRiskClassifier
{
    public async Task<RiskLevel> GetStockRiskLevelAsync(string symbol, int daysBack)
    {
        var historyData = await stockPriceRetriever.GetStockHistoryAsync(symbol, daysBack);
        var financialOverview = await stockPriceRetriever.GetStockFinancialOverviewAsync(symbol);

        var closePriceHistory = ConversionUtils.GetClosePricesDictionary(historyData);

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

    private static RiskLevel ClassifyEtf(decimal volatility, decimal averageReturn, decimal maxDrawdown)
    {
        if (volatility > 0.3m || maxDrawdown > 0.4m)
        {
            return RiskLevel.High;
        }

        if (volatility > 0.2m || maxDrawdown > 0.3m || averageReturn < 0.05m)
        {
            return RiskLevel.Medium;
        }

        return RiskLevel.Low;
    }

    private static RiskLevel ClassifyStock(decimal volatility, decimal averageReturn, decimal maxDrawdown,
        StockClassificationData stockClassificationData)
    {
        if (volatility > 0.3m || maxDrawdown > 0.4m || stockClassificationData.Beta > 1.5m ||
            stockClassificationData.Roe < 10 || stockClassificationData.PeRatio > 25 ||
            stockClassificationData.PbRatio > 3 || stockClassificationData.DividendYield < 1 || averageReturn < 0.05m)
        {
            return RiskLevel.High;
        }

        if (volatility > 0.2m || maxDrawdown > 0.3m || stockClassificationData.Beta > 1.0m ||
            stockClassificationData.Roe < 15 || stockClassificationData.PeRatio > 20 ||
            stockClassificationData.PbRatio > 2 || stockClassificationData.DividendYield < 2 || averageReturn < 0.10m)
        {
            return RiskLevel.Medium;
        }

        return RiskLevel.Low;
    }
}