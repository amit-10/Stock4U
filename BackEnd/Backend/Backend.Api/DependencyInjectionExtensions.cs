using Backend.Bl.Lib;
using Backend.Common.Interfaces;
using Backend.Dal.Lib;

namespace Backend.Api;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection
            .AddSingleton<IUserDataHandler, UserDataHandler>()
            .AddSingleton<IUserDataRetriever, UserDataRetriever>();

        return serviceCollection;
    }
}