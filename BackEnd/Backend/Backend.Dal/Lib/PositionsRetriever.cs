using Backend.Common.Interfaces;
using Backend.Common.Models;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using MongoDB.Driver;

namespace Backend.Dal.Lib;

public class PositionsRetriever(IMongoHandler mongoHandler, MongoConfiguration mongoConfiguration) : IPositionsRetriever
{
    private readonly IMongoCollection<UserPositions> _userInvestmentStatusCollection =
        mongoHandler.GetCollection<UserPositions>(mongoConfiguration.UserPositionsCollectionName);
    
    public UserPositions GetUserInvestmentStatusById(string userId)
    {
        return _userInvestmentStatusCollection.AsQueryable().Single(userPositions => userPositions.UserId == userId);
    }
}