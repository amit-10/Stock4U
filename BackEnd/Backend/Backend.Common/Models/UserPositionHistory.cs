namespace Backend.Common.Models;

public class UserPositionHistory
{
    public string UserId { get; set; } = null!;

    public ClosedPosition ClosedPosition { get; set; } = null!;
}