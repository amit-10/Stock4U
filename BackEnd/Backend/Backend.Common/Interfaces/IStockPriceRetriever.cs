using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IStockPriceRetriever
{
    Task<RealTimeStock> GetRealTimeStockAsync(string symbol);

    Task<Dictionary<string, StockDailyDataDouble>> GetStockHistoryAsync(string symbol);
}