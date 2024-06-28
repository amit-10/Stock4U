using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Common.Models.Achievements;

[BsonIgnoreExtraElements]
public class Achievement
{
    public AchievementType Type { get; set; }
    
    public string Description { get; set; } = null!;
    
    public int PointsNumber { get; set; }
}