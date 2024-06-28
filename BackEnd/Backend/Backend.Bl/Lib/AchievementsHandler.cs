using Backend.Common.Interfaces.Achievements;
using Backend.Common.Models.Achievements;

namespace Backend.Bl.Lib;

public class AchievementsHandler(IAchievementsRetriever achievementsRetriever) : IAchievementsHandler
{
    public async Task<List<Achievement>> GetAllAchievementsAsync()
    {
        return await achievementsRetriever.GetAllAchievementsAsync();
    }
}