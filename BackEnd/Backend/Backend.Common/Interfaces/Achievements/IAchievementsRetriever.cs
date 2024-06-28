using Backend.Common.Models.Achievements;

namespace Backend.Common.Interfaces.Achievements;

public interface IAchievementsRetriever
{
    Task<List<Achievement>> GetAllAchievementsAsync();
}