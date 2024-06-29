using Backend.Common.Interfaces.Users;
using Backend.Common.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UsersController(IUsersHandler usersHandler, ILogger<UsersController> logger) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> RegisterAsync(RegisterUserRequest registerUserRequest)
    {
        try
        {
            await usersHandler.RegisterAsync(registerUserRequest);
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error trying to register user {@user}", registerUserRequest);
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> LoginAsync(LoginUserRequest loginUserRequest)
    {
        try
        {
            await usersHandler.LoginAsync(loginUserRequest);
            return StatusCode(StatusCodes.Status200OK);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error trying to logging in user {@user}", loginUserRequest);
            return StatusCode(StatusCodes.Status500InternalServerError, exception.Message);
        }
    }
}
