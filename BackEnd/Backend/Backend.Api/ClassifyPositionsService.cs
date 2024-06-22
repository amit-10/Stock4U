using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Interfaces.Positions;
using Backend.InvestingAdvisor.Configuration;

namespace Backend.Api;

public class ClassifyPositionsService(
    PositionsFeedbackConfiguration positionsFeedbackConfiguration,
    IPositionsRetriever positionsRetriever,
    IPositionFeedbackClassifier positionFeedbackClassifier,
    IPositionsUpdater positionsUpdater,
    ILogger<ClassifyPositionsService> logger) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        // while (!cancellationToken.IsCancellationRequested)
        // {
            var positionsToClassify = await positionsRetriever.GetNonFeedbackedClosedPositions();
            foreach (var positionToClassify in positionsToClassify)
            {
                var positionFeedback = await positionFeedbackClassifier.GetPositionFeedbackAsync(positionToClassify);
                await positionsUpdater.SetPositionFeedbackAsync(positionToClassify, positionFeedback);
            }
            
            logger.LogInformation("Successfully updated positions feedback");

        //     await Task.Delay(TimeSpan.FromHours(positionsFeedbackConfiguration.FeedbackCalculationIntervalInHours),
        //         cancellationToken);
        // }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}