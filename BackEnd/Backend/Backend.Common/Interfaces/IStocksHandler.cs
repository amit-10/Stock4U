using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IStocksHandler
{
    Task<RealTimeStock> GetRealTimeStockBySymbolAsync(string symbol);
}