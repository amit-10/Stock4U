namespace Backend.Dal.Configuration;

public class MongoConfiguration
{
    public string ConnectionString { get; set; } = null!;
    
    public string DbName { get; set; } = null!;
    
    public string UserPositionsCollectionName { get; set; } = null!;
}