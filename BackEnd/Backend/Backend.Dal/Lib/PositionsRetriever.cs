using Backend.Common.Interfaces;
using Backend.Common.Models;
using Backend.Common.Models.Positions;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Backend.Dal.Lib;

public class PositionsRetriever(
    IMongoHandler mongoHandler,
    MongoConfiguration mongoConfiguration,
    ILogger<PositionsRetriever> logger) : IPositionsRetriever
{
    private readonly IMongoCollection<UserPositions> _userInvestmentStatusCollection =
        mongoHandler.GetCollection<UserPositions>(mongoConfiguration.UserPositionsCollectionName);

    public async Task<UserPositions> GetUserInvestmentStatusByIdAsync(string userId)
    {
        UserPositions userInvestmentStatus;
        try
        {
            userInvestmentStatus = await _userInvestmentStatusCollection.AsQueryable()
                .SingleOrDefaultAsync(userPositions => userPositions.UserId == userId);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error getting user {userId} investment status", userId);
            throw;
        }

        return userInvestmentStatus;
    }
}