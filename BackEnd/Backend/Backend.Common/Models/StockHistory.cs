using System.Text.Json.Serialization;

namespace Backend.Common.Models;

public class StockHistory
{
    [JsonPropertyName("Time Series (Daily)")]
    public Dictionary<string, StockDailyData> DateToStockData { get; set; } = null!;
}