using Backend.Common.Interfaces;
using Backend.Common.Interfaces.InvestingAdvisor;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class InvestingAdvisorController(
    IInvestingAdvisorHandler investingAdvisorHandler,
    ILogger<InvestingAdvisorController> logger) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetStockRiskLevelAsync(string symbol)
    {
        try
        {
            var userInvestmentStatus = await investingAdvisorHandler.ClassifyStockAsync(symbol);
            return StatusCode(StatusCodes.Status200OK, userInvestmentStatus);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error classifying stock {symbol}", symbol);
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
}