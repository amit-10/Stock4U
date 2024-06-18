using Backend.Common.Models.InvestingAdvisor;

namespace Backend.InvestingAdvisor.Interfaces;

public interface IStockRiskClassifier
{
    Task<RiskLevel> GetStockRiskLevelAsync(string symbol, int daysBack);
}