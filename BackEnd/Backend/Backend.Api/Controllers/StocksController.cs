using Backend.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class StocksController(IStocksHandler stocksHandler) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetRealTimeStockAsync(string symbol)
    {
        try
        {
            var realTimeStock = await stocksHandler.GetRealTimeStockBySymbolAsync(symbol);
            return StatusCode(StatusCodes.Status200OK, realTimeStock);
        }
        catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
    
    [HttpGet]
    public async Task<IActionResult> GetStockHistoryAsync(string symbol)
    {
        try
        {
            var realTimeStock = await stocksHandler.GetStockHistoryBySymbolAsync(symbol);
            return StatusCode(StatusCodes.Status200OK, realTimeStock);
        }
        catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
}