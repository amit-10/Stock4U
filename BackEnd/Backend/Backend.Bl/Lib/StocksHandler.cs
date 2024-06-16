using Backend.Common.Interfaces;
using Backend.Common.Models;

namespace Backend.Bl.Lib;

public class StocksHandler(IStockPriceRetriever stockPriceRetriever) : IStocksHandler
{
    public async Task<RealTimeStock> GetRealTimeStockBySymbolAsync(string symbol)
    {
        return await stockPriceRetriever.GetRealTimeStockAsync(symbol);
    }
}