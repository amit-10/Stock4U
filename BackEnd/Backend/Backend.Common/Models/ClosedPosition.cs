namespace Backend.Common.Models;

public class ClosedPosition : Position
{
    public double ClosePrice { get; set; }
    
    public DateTime CloseTime { get; set; }
}