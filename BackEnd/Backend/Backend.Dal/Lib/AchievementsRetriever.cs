using Backend.Common.Interfaces.Achievements;
using Backend.Common.Models.Achievements;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Backend.Dal.Lib;

public class AchievementsRetriever(
    IMongoHandler mongoHandler,
    MongoConfiguration mongoConfiguration,
    ILogger<PositionsRetriever> logger) : IAchievementsRetriever
{
    private readonly IMongoCollection<Achievement> _achievementsCollection =
        mongoHandler.GetCollection<Achievement>(mongoConfiguration.AchievementsCollectionName);
    
    public async Task<List<Achievement>> GetAllAchievementsAsync()
    {
        List<Achievement> achievements;
        try
        {
            achievements = await _achievementsCollection.AsQueryable().ToListAsync();
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error getting achievements");
            throw;
        }

        return achievements;
    }
}