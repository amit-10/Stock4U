namespace Backend.Common.Models.Positions;

public class UserPositionHistory
{
    public string UserId { get; set; } = null!;

    public ClosedPosition ClosedPosition { get; set; } = null!;
}