using Backend.Common.Models.Users;

namespace Backend.Common.Interfaces.Users;

public interface IUsersHandler
{
    Task RegisterAsync(User user);
}