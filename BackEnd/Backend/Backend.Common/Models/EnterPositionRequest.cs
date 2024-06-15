namespace Backend.Common.Models;

public class EnterPositionRequest
{
    public string UserId { get; set; } = null!;

    public Position Position { get; set; } = null!;
}