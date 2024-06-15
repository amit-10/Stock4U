namespace Backend.Common.Models;

public class UserInvestmentStatus
{
    public string UserId { get; set; } = null!;
    
    public double AccountBalance { get; set; }
    
    public List<Position> Positions { get; set; } = null!;
}