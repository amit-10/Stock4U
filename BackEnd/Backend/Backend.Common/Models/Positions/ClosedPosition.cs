namespace Backend.Common.Models.Positions;

public class ClosedPosition : Position
{
    public double ClosePrice { get; set; }
    
    public DateTime CloseTime { get; set; }
}