using Backend.Common.Models.Positions;

namespace Backend.Common.Interfaces.Positions;

public interface IPositionsHandler
{
    Task<UserInvestmentStatus> GetUserInvestmentStatusAsync(string userId);

    Task<IEnumerable<ClosedPosition>> GetUserPositionsHistoryAsync(string userId);
    
    Task EnterPositionAsync(EnterPositionRequest enterPositionRequest);

    Task ClosePositionAsync(ClosePositionRequest closePositionRequest);
}