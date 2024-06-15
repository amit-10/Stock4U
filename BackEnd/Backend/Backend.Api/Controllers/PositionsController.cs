using Backend.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[action]")]
public class PositionsController(IPositionsHandler positionsHandler) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUserInvestmentStatus(string userId)
    {
        try
        {
            var userInvestmentStatus = positionsHandler.GetUserInvestmentStatusById(userId);
            return StatusCode(StatusCodes.Status200OK, userInvestmentStatus);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }
}