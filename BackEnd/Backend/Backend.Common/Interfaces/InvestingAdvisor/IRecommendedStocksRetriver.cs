using Backend.Common.Models.InvestingAdvisor;

namespace Backend.Common.Interfaces.InvestingAdvisor;

public interface IRecommendedStocksRetriver
{
    Task<List<RecommendedStocks>> GetAllRecommendedStocksAsync();
    
}