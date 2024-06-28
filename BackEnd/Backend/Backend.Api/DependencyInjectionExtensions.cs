using Backend.Bl.Configuration;
using Backend.Bl.Interfaces;
using Backend.Bl.Lib;
using Backend.Bl.Lib.Achievements;
using Backend.Common.Interfaces.Achievements;
using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Interfaces.Positions;
using Backend.Common.Interfaces.Stocks;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Backend.Dal.Lib;
using Backend.InvestingAdvisor.Configuration;
using Backend.InvestingAdvisor.Lib.PositionsFeedback;
using Backend.InvestingAdvisor.Lib.StocksRiskClassification;

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
            .AddSingleton<IStockPriceRetriever, StocksPriceRetriever>()
            .AddSingleton<IInvestingAdvisorHandler, InvestingAdvisorHandler>()
            .AddSingleton<IStockRiskClassifier, StockRiskClassifier>()
            .AddSingleton<IPositionFeedbackClassifier, PositionFeedbackClassifier>()
            .AddSingleton<IAchievementsHandler, AchievementsHandler>()
            .AddSingleton<IAchievementsRetriever, AchievementsRetriever>()
            .AddSingleton<IAchievementsUpdater, AchievementsUpdater>()
            .AddSingleton<IUserToAchievementConnector, UserToAchievementConnector>()
            .AddHostedService<UserToAchievementService>()
            /*.AddHostedService<ClassifyPositionsService>()*/;

        return serviceCollection;
    }

    public static IServiceCollection AddMapping(this IServiceCollection serviceCollection)
    {
        var mapping = FinancialOverviewToStockClassificationDataMapper.GetMapping();
        serviceCollection.AddSingleton(mapping);
        
        return serviceCollection;
    }

    public static IServiceCollection AddConfiguration(this IServiceCollection serviceCollection,
        IConfiguration configuration)
    {
        serviceCollection
            .AddConfiguration<MongoConfiguration>(configuration, "MongoDb")
            .AddConfiguration<RealTimeStocksApiConfiguration>(configuration, "RealTimeStocksApi")
            .AddConfiguration<HistoryStocksApiConfiguration>(configuration, "HistoryStocksApi")
            .AddConfiguration<PositionsFeedbackConfiguration>(configuration, "PositionsFeedback")
            .AddConfiguration<UserToAchievementConfiguration>(configuration, "UserToAchievement");
        
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