using System.Text.Json.Serialization;

namespace Backend.Common.Models.Positions;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PositionFeedback
{
    NotCalculated,
    NoFeedback,
    Positive,
    RiskLevelMismatch,
    ExitedTooEarly,
    ExitedTooLate,
    ShouldNotHaveEntered
}