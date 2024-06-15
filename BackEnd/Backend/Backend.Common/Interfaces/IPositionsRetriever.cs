using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IPositionsRetriever
{
    UserPositions GetUserInvestmentStatusById(string userId);
}