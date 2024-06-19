using Backend.Common.Interfaces;
using Backend.Common.Interfaces.Positions;
using Backend.Common.Models.Positions;

namespace Backend.Bl.Lib;

public class PositionsHandler(IPositionsRetriever positionsRetriever, IPositionsUpdater positionsUpdater) : IPositionsHandler
{
    public async Task<UserPositions> GetUserInvestmentStatusAsync(string userId)
    {
        return await positionsRetriever.GetUserInvestmentStatusByIdAsync(userId);
    }

    public async Task<IEnumerable<ClosedPosition>> GetUserPositionsHistoryAsync(string userId)
    {
        var userPositionsHistory = await positionsRetriever.GetUserPositionsHistoryAsync(userId);
        return userPositionsHistory.Select(position => position.ClosedPosition);
    }

    public async Task EnterPositionAsync(EnterPositionRequest enterPositionRequest)
    {
        await positionsUpdater.EnterPositionAsync(enterPositionRequest.UserId, enterPositionRequest.Position);
    }

    public async Task ClosePositionAsync(ClosePositionRequest closePositionRequest)
    {
        await positionsUpdater.ClosePositionAsync(closePositionRequest.UserId, closePositionRequest.PositionId,
            closePositionRequest.ClosePrice, closePositionRequest.CloseTime, closePositionRequest.SharesCount);
    }
}