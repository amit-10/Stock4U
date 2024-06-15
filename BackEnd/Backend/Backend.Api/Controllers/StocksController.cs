using Backend.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[action]")]
public class StocksController(IUserDataHandler userDataHandler) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUserInvestmentStatus(string userId)
    {
        try
        {
            var userInvestmentStatus = userDataHandler.GetUserInvestmentStatusById(userId);
            return StatusCode(StatusCodes.Status200OK, userInvestmentStatus);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }
}