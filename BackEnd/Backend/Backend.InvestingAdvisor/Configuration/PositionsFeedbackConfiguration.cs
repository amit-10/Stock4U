using Backend.Common.Models.InvestingAdvisor;

namespace Backend.InvestingAdvisor.Configuration;

public class PositionsFeedbackConfiguration
{
    public double FeedbackCalculationIntervalInHours { get; set; } = 24;

    public decimal PeakDropThreshold { get; set; } = 10m;

    public int PostCloseGainWindow { get; set; } = 30;

    public decimal PostCloseGainThreshold { get; set; } = 5m;

    public int PreEntryLossWindow { get; set; } = 10;

    public decimal EntryLossThreshold { get; set; } = 5m;

    public Dictionary<RiskLevel, decimal> PositiveFeedbackThreshold { get; set; } = new()
    {
        { RiskLevel.Low, 10m },
        { RiskLevel.Medium, 15m },
        { RiskLevel.High, 20m }
    };
}