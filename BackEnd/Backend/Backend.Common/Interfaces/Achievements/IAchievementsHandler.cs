using Backend.Common.Models.Achievements;

namespace Backend.Common.Interfaces.Achievements;

public interface IAchievementsHandler
{
    Task<List<Achievement>> GetAllAchievementsAsync();
}