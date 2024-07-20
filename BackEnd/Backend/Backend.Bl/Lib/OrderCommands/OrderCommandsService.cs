using Backend.Bl.Configuration;
using Backend.Bl.Interfaces;
using Backend.Common.Interfaces.Positions;
using Backend.Common.Interfaces.Stocks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Backend.Bl.Lib.OrderCommands;

public class OrderCommandsService(
    IPositionsRetriever positionsRetriever,
    IPositionsUpdater positionsUpdater,
    OrderCommandsConfiguration orderCommandsConfiguration,
    IStockPriceRetriever stockPriceRetriever,
    ILogger<OrderCommandsService> logger) : IHostedService
{
    private Task _backgroundTask = null!;
    private CancellationTokenSource _cancellationTokenSource = null!;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        _backgroundTask = Task.Run(async () =>
        {
            try
            {
                await BackgroundProcessing(_cancellationTokenSource.Token);
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "Failed making order commands");
                throw;
            }
        });
        return Task.CompletedTask;
    }

    private async Task BackgroundProcessing(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            var allUsersPositions = await positionsRetriever.GetAllUserPositionsAsync();
            foreach (var userPositions in allUsersPositions)
            {
                logger.LogInformation("UserID {position.PositionId}", userPositions.UserId);
                foreach (var position in userPositions.Positions)
                {
                    if (position.StopLimitPrice != -1)
                    {
                        var realTimeStock = await stockPriceRetriever.GetRealTimeStockAsync(position.ShareSymbol);
                        var realTimeStockPrice = realTimeStock.CurrentPrice;
                        logger.LogInformation("postion id: {position.PositionId}, realTimeStockPrice: {realTimeStockPrice}, StopLimitPrice: {StopLimitPrice}", position.PositionId, realTimeStockPrice, position.StopLimitPrice);

                        if (realTimeStockPrice <= position.StopLimitPrice)
                        {
                            await positionsUpdater.ClosePositionAsync(userPositions.UserId, position.PositionId, realTimeStockPrice, DateTime.Now, position.SharesCount);
                        }
                    }
                    // logger.LogInformation("{userPositions.Positions}", position.PositionId);
                }

                // logger.LogInformation("Successfully updated users achievements");
            }

            await Task.Delay(
                TimeSpan.FromMinutes(orderCommandsConfiguration.OrderCommandsCalculationTimeInMinutes),
                cancellationToken);
        }
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _cancellationTokenSource.CancelAsync();
        await Task.WhenAny(_backgroundTask, Task.Delay(Timeout.Infinite, cancellationToken));
    }
}