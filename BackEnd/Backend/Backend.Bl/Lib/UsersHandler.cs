// using Backend.Common.Interfaces.Positions;
// using Backend.Common.Interfaces.Stocks;
// using Backend.Common.Models.Positions;
using Backend.Common.Interfaces.Users;
using Backend.Common.Models.Users;

namespace Backend.Bl.Lib;

public class UsersHandler(
    IUsersHandler userHandler) : IUsersHandler
{
    public async Task RegisterAsync(User user)
    {
        await userHandler.RegisterAsync(user);
    }
}