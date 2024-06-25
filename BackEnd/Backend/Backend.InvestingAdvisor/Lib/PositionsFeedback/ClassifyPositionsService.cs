using Backend.Common.Interfaces.InvestingAdvisor;
using Backend.Common.Interfaces.Positions;
using Backend.InvestingAdvisor.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.InvestingAdvisor.Lib.PositionsFeedback
{
    public class ClassifyPositionsService : IHostedService
    {
        private readonly PositionsFeedbackConfiguration _positionsFeedbackConfiguration;
        private readonly IPositionsRetriever _positionsRetriever;
        private readonly IPositionFeedbackClassifier _positionFeedbackClassifier;
        private readonly IPositionsUpdater _positionsUpdater;
        private readonly ILogger<ClassifyPositionsService> _logger;
        private Task _backgroundTask;
        private CancellationTokenSource _cancellationTokenSource;

        public ClassifyPositionsService(
            PositionsFeedbackConfiguration positionsFeedbackConfiguration,
            IPositionsRetriever positionsRetriever,
            IPositionFeedbackClassifier positionFeedbackClassifier,
            IPositionsUpdater positionsUpdater,
            ILogger<ClassifyPositionsService> logger)
        {
            _positionsFeedbackConfiguration = positionsFeedbackConfiguration;
            _positionsRetriever = positionsRetriever;
            _positionFeedbackClassifier = positionFeedbackClassifier;
            _positionsUpdater = positionsUpdater;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            _backgroundTask = Task.Run(async () => await BackgroundProcessing(_cancellationTokenSource.Token));
            return Task.CompletedTask;
        }

        private async Task BackgroundProcessing(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var positionsToClassify = await _positionsRetriever.GetNonFeedbackedClosedPositions();
                foreach (var positionToClassify in positionsToClassify)
                {
                    var positionFeedback = await _positionFeedbackClassifier.GetPositionFeedbackAsync(positionToClassify);
                    await _positionsUpdater.SetPositionFeedbackAsync(positionToClassify, positionFeedback);
                }

                _logger.LogInformation("Successfully updated positions feedback");

                await Task.Delay(TimeSpan.FromMinutes(_positionsFeedbackConfiguration.FeedbackCalculationIntervalInMinutes),
                    cancellationToken);
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await _cancellationTokenSource.CancelAsync();
            await Task.WhenAny(_backgroundTask, Task.Delay(Timeout.Infinite, cancellationToken));
        }
    }
}
