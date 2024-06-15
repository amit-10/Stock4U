using Backend.Common.Interfaces;
using Backend.Common.Models;

namespace Backend.Bl.Lib;

public class UserDataHandler(IUserDataRetriever userDataRetriever) : IUserDataHandler
{
    private readonly IUserDataRetriever _userDataRetriever = userDataRetriever;

    public UserInvestmentStatus GetUserInvestmentStatusById(string userId)
    {
        return _userDataRetriever.GetUserInvestmentStatusById(userId);
    }
}