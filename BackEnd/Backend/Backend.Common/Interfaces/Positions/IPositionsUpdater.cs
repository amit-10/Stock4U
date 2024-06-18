using Backend.Common.Models.Positions;

namespace Backend.Common.Interfaces;

public interface IPositionsUpdater
{
    Task EnterPositionAsync(string userId, Position position);

    Task ClosePositionAsync(string userId, string positionId, double closePrice, DateTime closeTime,
        double sharesCountToClose);
}