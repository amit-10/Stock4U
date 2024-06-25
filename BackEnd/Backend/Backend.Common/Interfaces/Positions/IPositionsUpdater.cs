using Backend.Common.Models.Positions;

namespace Backend.Common.Interfaces.Positions;

public interface IPositionsUpdater
{
    Task EnterPositionAsync(string userId, Position position);

    Task ClosePositionAsync(string userId, string positionId, decimal closePrice, DateTime closeTime,
        decimal sharesCountToClose);

    Task SetPositionFeedbackAsync(UserPositionHistory position, PositionFeedback feedback);
}