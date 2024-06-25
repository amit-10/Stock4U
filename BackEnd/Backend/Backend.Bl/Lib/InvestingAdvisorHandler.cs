using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Models.InvestingAdvisor;

namespace Backend.Bl.Lib;

public class InvestingAdvisorHandler(IStockRiskClassifier stockRiskClassifier) : IInvestingAdvisorHandler
{
    public async Task<RiskLevel> ClassifyStockAsync(string symbol)
    {
        return await stockRiskClassifier.GetStockRiskLevelAsync(symbol, 100);
    }
}