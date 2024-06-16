using Backend.Bl.Lib;
using Backend.Common.Interfaces;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Backend.Dal.Lib;

namespace Backend.Api;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection
            .AddSingleton<IPositionsHandler, PositionsHandler>()
            .AddSingleton<IPositionsRetriever, PositionsRetriever>()
            .AddSingleton<IPositionsUpdater, PositionsUpdater>()
            .AddSingleton<IMongoHandler, MongoHandler>()
            .AddSingleton<IStocksHandler, StocksHandler>()
            .AddSingleton<IStockPriceRetriever, StocksPriceRetriever>();

        return serviceCollection;
    }

    public static IServiceCollection AddConfiguration(this IServiceCollection serviceCollection,
        IConfiguration configuration)
    {
        serviceCollection
            .AddConfiguration<MongoConfiguration>(configuration, "MongoDb")
            .AddConfiguration<RealTimeStocksApiConfiguration>(configuration, "RealTimeStocksApi")
            .AddConfiguration<HistoryStocksApiConfiguration>(configuration, "HistoryStocksApi");
        
        return serviceCollection;
    }

    private static IServiceCollection AddConfiguration<T>(this IServiceCollection serviceCollection,
        IConfiguration configuration, string key) where T : class
    {
        var configurationValue = configuration.GetSection(key).Get<T>() ??
                                 throw new ArgumentNullException($"Can't find {key} configuration");
        serviceCollection.AddSingleton(configurationValue);
        return serviceCollection;
    }
}