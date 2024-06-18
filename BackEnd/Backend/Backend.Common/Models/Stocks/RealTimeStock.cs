using System.Text.Json.Serialization;

namespace Backend.Common.Models.Stocks;

public class RealTimeStock
{
    [JsonPropertyName("c")]
    public double CurrentPrice { get; set; }

    [JsonPropertyName("d")]
    public double Change { get; set; }

    [JsonPropertyName("dp")]
    public double ChangePercent { get; set; }

    [JsonPropertyName("h")]
    public double DayHighPrice { get; set; }

    [JsonPropertyName("l")]
    public double DayLowPrice { get; set; }
    
    [JsonPropertyName("o")]
    public double DayOpenPrice { get; set; }

    [JsonPropertyName("pc")]
    public double PreviousClosePrice { get; set; }
}