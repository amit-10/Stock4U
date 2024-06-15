using Backend.Common.Models;

namespace Backend.Common.Interfaces;

public interface IUserDataRetriever
{
    UserInvestmentStatus GetUserInvestmentStatusById(string userId);
}