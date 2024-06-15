using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IPositionsHandler
{
    Task<UserPositions> GetUserInvestmentStatusByIdAsync(string userId);

    Task EnterPositionAsync(EnterPositionRequest enterPositionRequest);

    Task ClosePositionAsync(ClosePositionRequest closePositionRequest);
}