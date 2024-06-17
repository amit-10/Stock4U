using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IStocksHandler
{
    Task<RealTimeStock> GetRealTimeStockAsync(string symbol);
    
    Task<Dictionary<string, StockDailyData>> GetStockHistoryAsync(string symbol, int daysBack);
}