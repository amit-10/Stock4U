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

    public async Task<Dictionary<string, StockDailyDataDouble>> GetStockHistoryAsync(string symbol)
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

        return response.DateToStockData.Take(100).ToDictionary().Adapt<Dictionary<string, StockDailyDataDouble>>();
        // JObject response;
        // try
        // {
        //     response = await fullUrl.GetJsonAsync<JObject>();
        // }
        // catch (Exception e)
        // {
        //     Console.WriteLine(e);
        //     throw;
        // }
        // var timeSeries = response["Time Series (Daily)"];
        // var stockDataDictionary = new Dictionary<string, StockDailyData>();;
        // if (timeSeries != null)
        // {
        //     var oneYearAgo = DateTime.Now.AddYears(-1);
        //
        //     foreach (var item in timeSeries)
        //     {
        //         var dateProperty = (JProperty)item;
        //         var date = DateTime.Parse(dateProperty.Name);
        //         if (date >= oneYearAgo)
        //         {
        //             var stockData = dateProperty.Value.ToObject<StockDailyData>();
        //             stockDataDictionary.Add(dateProperty.Name, stockData);
        //         }
        //     }
        // }
        //
        // return stockDataDictionary;
    }
}