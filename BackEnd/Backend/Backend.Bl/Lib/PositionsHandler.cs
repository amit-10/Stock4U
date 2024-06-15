using Backend.Common.Interfaces;
using Backend.Common.Models;

namespace Backend.Bl.Lib;

public class PositionsHandler(IPositionsRetriever positionsRetriever) : IPositionsHandler
{
    private readonly IPositionsRetriever _positionsRetriever = positionsRetriever;

    public UserPositions GetUserInvestmentStatusById(string userId)
    {
        return _positionsRetriever.GetUserInvestmentStatusById(userId);
    }
}