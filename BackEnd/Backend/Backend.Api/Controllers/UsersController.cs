using Backend.Common.Interfaces.Users;
using Backend.Common.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;


[ApiController]
[Route("[controller]/[action]")]
public class UsersController(
    IUsersHandler usersHandler,
    ILogger<UsersController> logger) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> RegisterAsync(User user)
    {
        try
        {
            Console.WriteLine("LOL");
            await usersHandler.RegisterAsync(user);
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error registering user {@user}", user);
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }

    // [HttpPost]
    // public async Task<IActionResult> LoginAsync(string symbol)
    // {
    //     try
    //     {
    //         var userInvestmentStatus = await investingAdvisorHandler.ClassifyStockAsync(symbol);
    //         return StatusCode(StatusCodes.Status200OK, userInvestmentStatus);
    //     }
    //     catch (Exception exception)
    //     {
    //         logger.LogError(exception, "Error classifying stock {symbol}", symbol);
    //         return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
    //     }
    // }
}