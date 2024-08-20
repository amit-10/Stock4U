using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Common.Models.InvestingAdvisor;

public class RecommendedStocks
{
    
    [BsonRepresentation(BsonType.String)]

    public ObjectId _id { get; set; }
    
    public RiskLevel RiskLevel { get; set; }

    public string Symbol { get; set; } = null!;
}