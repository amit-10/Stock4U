using Backend.Common.Models.Positions;

namespace Backend.Common.Interfaces.Positions;

public interface IPositionsRetriever
{
    Task<UserPositions> GetUserInvestmentStatusByIdAsync(string userId);

    Task<List<UserPositionHistory>> GetUserPositionsHistoryAsync(string userId);

    Task<List<UserPositionHistory>> GetNonFeedbackedClosedPositions();
}