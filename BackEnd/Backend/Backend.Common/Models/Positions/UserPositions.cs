using Backend.Common.Models.InvestingAdvisor;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Common.Models.Positions;

[BsonIgnoreExtraElements]
public class UserPositions
{
    public string UserId { get; set; } = null!;
    
    public decimal AccountBalance { get; set; }
    
    public RiskLevel RiskLevel { get; set; }
    
    public List<Position> Positions { get; set; } = null!;
}