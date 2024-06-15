using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IUserDataHandler
{
    UserInvestmentStatus GetUserInvestmentStatusById(string userId);
}