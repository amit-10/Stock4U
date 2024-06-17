using Backend.Common.Interfaces;
using Backend.Common.Models;

namespace Backend.Bl.Lib;

public class StocksHandler(IStockPriceRetriever stockPriceRetriever) : IStocksHandler
{
    public async Task<RealTimeStock> GetRealTimeStockAsync(string symbol)
    {
        return await stockPriceRetriever.GetRealTimeStockAsync(symbol);
    }

    public async Task<Dictionary<string, StockDailyData>> GetStockHistoryAsync(string symbol, int daysBack)
    {
        return await stockPriceRetriever.GetStockHistoryAsync(symbol, daysBack);
    }
}