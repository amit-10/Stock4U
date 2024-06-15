using Backend.Common.Interfaces;
using Backend.Common.Models;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Backend.Dal.Lib;

public class PositionsUpdater(IMongoHandler mongoHandler, MongoConfiguration mongoConfiguration) : IPositionsUpdater
{
    private readonly IMongoCollection<UserPositions> _userPositionsCollection =
        mongoHandler.GetCollection<UserPositions>(mongoConfiguration.UserPositionsCollectionName);
    private readonly IMongoCollection<UserPositionHistory> _userPositionsHistoryCollection =
        mongoHandler.GetCollection<UserPositionHistory>(mongoConfiguration.UserPositionsHistoryCollectionName);

    public async Task EnterPositionAsync(string userId, Position position)
    {
        var filter = Builders<UserPositions>.Filter.Eq(up => up.UserId, userId);
        var totalPrice = position.EntrancePrice * position.SharesCount;
        var update = Builders<UserPositions>.Update
            .Push(up => up.Positions, position)
            .Inc(up => up.AccountBalance, -totalPrice);

        await _userPositionsCollection.UpdateOneAsync(filter, update);
    }

    public async Task ClosePositionAsync(string userId, string positionId, double closePrice, DateTime closeTime, double sharesCountToClose)
    {
        var filter = Builders<UserPositions>.Filter.Eq(up => up.UserId, userId);
        var totalPrice = sharesCountToClose * closePrice;
        var currentUser = await _userPositionsCollection.AsQueryable().SingleAsync(user => user.UserId == userId);
        var currentPosition = currentUser.Positions.Single(position => position.PositionId == positionId);
        var update = Builders<UserPositions>.Update
            .Inc(up => up.AccountBalance, totalPrice);
        if (currentPosition.SharesCount == sharesCountToClose)
        {
            update = update
                .PullFilter(up => up.Positions, p => p.PositionId == positionId);
        }
        else
        {
            filter = Builders<UserPositions>.Filter.And(filter,
                Builders<UserPositions>.Filter.ElemMatch(up => up.Positions, pos => pos.PositionId == positionId));
            update = update.Set("Positions.$.SharesCount", currentPosition.SharesCount - sharesCountToClose);
        }
        
        await _userPositionsCollection.UpdateOneAsync(filter, update);
        
        
        var positionHistory = new UserPositionHistory
        {
            UserId = userId,
            ClosedPosition = new ClosedPosition
            {
                PositionId = positionId,
                ShareSymbol = currentPosition.ShareSymbol,
                ShareCategory = currentPosition.ShareCategory,
                EntrancePrice = currentPosition.EntrancePrice,
                PositionType = currentPosition.PositionType,
                EntranceTime = currentPosition.EntranceTime,
                ClosePrice = closePrice,
                CloseTime = closeTime,
                SharesCount = sharesCountToClose
            }
        };

        await _userPositionsHistoryCollection.InsertOneAsync(positionHistory);

    }
}