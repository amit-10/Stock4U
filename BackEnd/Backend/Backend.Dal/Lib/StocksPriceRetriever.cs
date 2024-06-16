using Backend.Common.Interfaces;
using Backend.Common.Models;
using Backend.Dal.Configuration;
using Flurl;
using Flurl.Http;

namespace Backend.Dal.Lib;

public class StocksPriceRetriever(StocksApiConfiguration stocksApiConfiguration) : IStockPriceRetriever
{
    // This Api is limited by 60 calls per minute
    private readonly Url _stocksApiUrl =
        stocksApiConfiguration.BaseUrl.SetQueryParam("token", stocksApiConfiguration.ApiKey);

    public async Task<RealTimeStock> GetRealTimeStockAsync(string symbol)
    {
        var fullUrl = _stocksApiUrl.SetQueryParam("symbol", symbol);
        var response = await fullUrl.GetJsonAsync<RealTimeStock>();
        return response;
    }
}