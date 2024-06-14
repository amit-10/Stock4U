using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
public class StocksController : ControllerBase
{
    [HttpGet("/Stocks")]
    public async Task<IActionResult> GetStocks()
    {
        try
        {
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }
}