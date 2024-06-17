using Backend.Common.Interfaces;
using Backend.Common.Models;
using Backend.Dal.Configuration;
using Flurl;
using Flurl.Http;
using Mapster;
using Newtonsoft.Json.Linq;

namespace Backend.Dal.Lib;

public class StocksPriceRetriever(
    RealTimeStocksApiConfiguration realTimeStocksApiConfiguration,
    HistoryStocksApiConfiguration historyStocksApiConfiguration) : IStockPriceRetriever
{
    // This Api is limited by 60 calls per minute
    private readonly Url _realTimeStocksApiUrl =
        realTimeStocksApiConfiguration.BaseUrl.SetQueryParam("token", realTimeStocksApiConfiguration.ApiKey);

    private readonly Url _historyStocksApiUrl =
        historyStocksApiConfiguration.BaseUrl
            .SetQueryParam("apikey", historyStocksApiConfiguration.ApiKey)
            .SetQueryParam("function", "TIME_SERIES_DAILY")
            .SetQueryParam("outputsize", "full");

    public async Task<RealTimeStock> GetRealTimeStockAsync(string symbol)
    {
        var fullUrl = _realTimeStocksApiUrl.SetQueryParam("symbol", symbol);
        var response = await fullUrl.GetJsonAsync<RealTimeStock>();
        return response;
    }

    // todo: check last refreshed time
    public async Task<Dictionary<string, StockDailyData>> GetStockHistoryAsync(string symbol, int daysBack)
    {
        var fullUrl = _historyStocksApiUrl.SetQueryParam("symbol", symbol);
        StockHistory response;
        try
        {
            response = await fullUrl.GetJsonAsync<StockHistory>();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        var formattedResponse = response.DateToStockData.Take(daysBack).ToDictionary()
            .Adapt<Dictionary<string, StockDailyData>>();
        return formattedResponse;
    }
}