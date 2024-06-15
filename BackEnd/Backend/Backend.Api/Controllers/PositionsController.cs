using Backend.Common.Interfaces;
using Backend.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[action]")]
public class PositionsController(IPositionsHandler positionsHandler) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUserInvestmentStatusAsync(string userId)
    {
        try
        {
            var userInvestmentStatus = await positionsHandler.GetUserInvestmentStatusByIdAsync(userId);
            return StatusCode(StatusCodes.Status200OK, userInvestmentStatus);
        }
        catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> EnterPositionAsync(EnterPositionRequest enterPositionRequest)
    {
        try
        {
            await positionsHandler.EnterPositionAsync(enterPositionRequest);
            return StatusCode(StatusCodes.Status200OK);
        }
        catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> ClosePositionAsync(ClosePositionRequest closePositionRequest)
    {
        try
        {
            await positionsHandler.ClosePositionAsync(closePositionRequest);
            return StatusCode(StatusCodes.Status200OK);
        }
        catch (Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
}