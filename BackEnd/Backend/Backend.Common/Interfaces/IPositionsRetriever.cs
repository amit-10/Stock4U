using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IPositionsRetriever
{
    Task<UserPositions> GetUserInvestmentStatusByIdAsync(string userId);
}