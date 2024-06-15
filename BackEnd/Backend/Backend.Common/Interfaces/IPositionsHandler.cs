using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IPositionsHandler
{
    UserPositions GetUserInvestmentStatusById(string userId);
}