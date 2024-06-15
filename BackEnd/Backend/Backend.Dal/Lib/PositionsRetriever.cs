using Backend.Common.Interfaces;
using Backend.Common.Models;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Backend.Dal.Lib;

public class PositionsRetriever(IMongoHandler mongoHandler, MongoConfiguration mongoConfiguration) : IPositionsRetriever
{
    private readonly IMongoCollection<UserPositions> _userInvestmentStatusCollection =
        mongoHandler.GetCollection<UserPositions>(mongoConfiguration.UserPositionsCollectionName);
    
    public async Task<UserPositions> GetUserInvestmentStatusByIdAsync(string userId)
    {
        return await _userInvestmentStatusCollection.AsQueryable()
            .SingleOrDefaultAsync(userPositions => userPositions.UserId == userId);
    }
}