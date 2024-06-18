using Backend.Common.Models.Positions;

namespace Backend.Common.Interfaces;

public interface IPositionsRetriever
{
    Task<UserPositions> GetUserInvestmentStatusByIdAsync(string userId);
}