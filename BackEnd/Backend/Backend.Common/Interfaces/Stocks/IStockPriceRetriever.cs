using Backend.Common.Models.Stocks;

namespace Backend.Common.Interfaces.Stocks;

public interface IStockPriceRetriever
{
    Task<RealTimeStock> GetRealTimeStockAsync(string symbol);

    Task<Dictionary<string, StockDailyData>> GetStockHistoryAsync(string symbol, int daysBack);

    Task<FinancialOverview?> GetStockFinancialOverviewAsync(string symbol);
}