using Backend.Common.Interfaces;
using Backend.Common.Models;

namespace Backend.Dal.Lib;

public class UserDataRetriever : IUserDataRetriever
{
    public UserInvestmentStatus GetUserInvestmentStatusById(string userId)
    {
        return new UserInvestmentStatus
        {
            UserId = "aaa",
            AccountBalance = 500000,
            Positions =
            [
                new Position
                {
                    ShareSymbol = "SPY",
                    SharesCount = 200,
                    EntrancePrice = 500,
                    PositionType = PositionType.Long,
                    EntranceTime = DateTime.Now
                }
            ]
        };
    }
}