using Backend.Common.Interfaces.Achievements;
using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Models.Achievements;
using Backend.Common.Models.InvestingAdvisor;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Backend.Dal.Lib;

public class RecommendedStocksUpdater(
    IMongoHandler mongoHandler,
    MongoConfiguration mongoConfiguration,
    ILogger<ReccommendedStocksRetriever> logger) : IRecommendedStocksUpdater
{
    private readonly IMongoCollection<RecommendedStocks> Recommended_Stocks =
        mongoHandler.GetCollection<RecommendedStocks>(mongoConfiguration.RecommendedStocks);
    
    public async Task AddRecommendedStockAsync(string symbol, RiskLevel riskLevel)
    {
        var recommendedStock = new RecommendedStocks()
        {
            Symbol = symbol,
            RiskLevel = riskLevel
        };

        try
        {
            await Recommended_Stocks.InsertOneAsync(recommendedStock);
        }
        catch (Exception exception)
        {
            logger.LogError("Error inserting symbol risk to recommended stocks {symbol} {riskLevel}", symbol, riskLevel);
            throw;
        }
    }
}