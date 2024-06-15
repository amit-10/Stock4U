using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Common.Models;

public class Position
{
    public string PositionId { get; set; } = null!;

    public string ShareSymbol { get; set; } = null!;
    
    public string ShareCategory { get; set; } = null!;

    public double EntrancePrice { get; set; }

    public double SharesCount { get; set; }

    [BsonRepresentation(BsonType.String)]
    public PositionType PositionType { get; set; }
    
    public DateTime EntranceTime { get; set; }
}