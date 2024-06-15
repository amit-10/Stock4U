namespace Backend.Common.Models;

public class ClosePositionRequest
{
    public string UserId { get; set; } = null!;
    
    public string PositionId { get; set; } = null!;
    
    public double ClosePrice { get; set; }
    
    public DateTime CloseTime { get; set; }
    
    public double SharesCount { get; set; }
}