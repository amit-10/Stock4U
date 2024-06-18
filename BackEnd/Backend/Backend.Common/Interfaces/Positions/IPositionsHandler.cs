using Backend.Common.Models;
using Backend.Common.Models.Positions;

namespace Backend.Common.Interfaces;

public interface IPositionsHandler
{
    Task<UserPositions> GetUserInvestmentStatusAsync(string userId);

    Task EnterPositionAsync(EnterPositionRequest enterPositionRequest);

    Task ClosePositionAsync(ClosePositionRequest closePositionRequest);
}