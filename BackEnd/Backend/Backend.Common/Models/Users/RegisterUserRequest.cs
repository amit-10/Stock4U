using Backend.Common.Models.InvestingAdvisor;

namespace Backend.Common.Models.Users;

public class RegisterUserRequest
{
    public string Email { get; set; } = null!;

    public string Username { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public RiskLevel RiskLevel { get; set; }
}
