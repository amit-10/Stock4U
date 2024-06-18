using Backend.Common.Interfaces;
using Backend.Common.Models.InvestingAdvisor;
using Backend.InvestingAdvisor.Interfaces;

namespace Backend.Bl.Lib;

public class InvestingAdvisorHandler(IStockRiskClassifier stockRiskClassifier) : IInvestingAdvisorHandler
{
    public async Task<RiskLevel> ClassifyStockAsync(string symbol)
    {
        return await stockRiskClassifier.GetStockRiskLevelAsync(symbol, 100);
    }
}