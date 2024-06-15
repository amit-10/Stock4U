using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Common.Models;

[BsonIgnoreExtraElements]
public class UserPositions
{
    public string UserId { get; set; } = null!;
    
    public double AccountBalance { get; set; }
    
    public List<Position> Positions { get; set; } = null!;
}