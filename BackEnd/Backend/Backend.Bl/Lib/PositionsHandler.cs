using Backend.Common.Interfaces.Positions;
using Backend.Common.Interfaces.Stocks;
using Backend.Common.Models.Positions;

namespace Backend.Bl.Lib;

public class PositionsHandler(
    IPositionsRetriever positionsRetriever,
    IPositionsUpdater positionsUpdater,
    IStockPriceRetriever stockPriceRetriever) : IPositionsHandler
{
    public async Task<UserInvestmentStatus> GetUserInvestmentStatusAsync(string userId)
    {
        var userPositions = await positionsRetriever.GetUserInvestmentStatusByIdAsync(userId);
        var userInvestmentStatus = new UserInvestmentStatus
        {
            UserId = userPositions.UserId,
            RiskLevel = userPositions.RiskLevel,
            AccountBalance = userPositions.AccountBalance,
            Positions = userPositions.Positions,
            TotalWorth = await CalculateUserNetWorth(userPositions)
        };
        
        return userInvestmentStatus;
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

    private async Task<decimal> CalculateUserNetWorth(UserPositions userPositions)
    {
        var totalNetWorth = userPositions.AccountBalance;
        foreach (var position in userPositions.Positions)
        {
            var realTimeStock = await stockPriceRetriever.GetRealTimeStockAsync(position.ShareSymbol);
            var currentInvestment = realTimeStock.CurrentPrice * position.SharesCount;
            var balanceToAdd = position.PositionType == PositionType.Long ? currentInvestment : -currentInvestment;
            totalNetWorth += balanceToAdd;
        }

        return totalNetWorth;
    }
}