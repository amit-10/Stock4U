using Backend.Common.Models.InvestingAdvisor;

namespace Backend.Common.Interfaces;

public interface IInvestingAdvisorHandler
{
    Task<RiskLevel> ClassifyStockAsync(string symbol);
}