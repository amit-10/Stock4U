using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Interfaces.Stocks;
using Backend.Common.Models.InvestingAdvisor;
using Backend.InvestingAdvisor.Interfaces;
using Backend.InvestingAdvisor.Lib.Utils;
using Backend.InvestingAdvisor.Models;
using Mapster;

namespace Backend.InvestingAdvisor.Lib.StocksRiskClassification;

public class StockRiskClassifier(
    IStockPriceRetriever stockPriceRetriever,
    IRiskGradesStockRiskClassifier riskGradesStockRiskClassifier,
    IRiskLevelUpdater riskLevelUpdater) : IStockRiskClassifier
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

        var riskGradesRiskLevel = await riskGradesStockRiskClassifier.GetStockRiskGradesRiskLevelAsync(symbol);
        await riskLevelUpdater.InsertRiskLevelComparisonAsync(symbol, riskLevel, riskGradesRiskLevel);

        return riskLevel;
    }

    private static RiskLevel ClassifyEtf(decimal volatility, decimal averageReturn, decimal maxDrawdown)
    {
        if (volatility > 1 || maxDrawdown > 0.5m)
        {
            return RiskLevel.High;
        }

        if (volatility > 0.7m || maxDrawdown > 0.4m || averageReturn < 0.1m)
        {
            return RiskLevel.Medium;
        }

        return RiskLevel.Low;
    }

    private static RiskLevel ClassifyStock(decimal volatility, decimal averageReturn, decimal maxDrawdown,
        StockClassificationData stockClassificationData)
    {
        if (volatility > 1 || maxDrawdown > 0.5m || stockClassificationData.Beta > 2.5m ||
            stockClassificationData.Roe < 0 || stockClassificationData.PeRatio > 60 ||
            stockClassificationData.PbRatio > 60 || averageReturn < 0.05m)
        {
            return RiskLevel.High;
        }

        if (volatility > 0.7m || maxDrawdown > 0.4m || stockClassificationData.Beta > 1.5m ||
            stockClassificationData.Roe < 0.1m || stockClassificationData.PeRatio > 50 ||
            stockClassificationData.PbRatio > 50 || averageReturn < 0.10m)
        {
            return RiskLevel.Medium;
        }

        return RiskLevel.Low;
    }
}