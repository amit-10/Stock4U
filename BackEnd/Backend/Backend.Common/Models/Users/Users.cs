using Backend.Common.Models.InvestingAdvisor;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Common.Models.Users;

[BsonIgnoreExtraElements]
public class Users
{
    public string Email { get; set; } = null!;

    public string Username { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public RiskLevel RiskLevel { get; set; }
}