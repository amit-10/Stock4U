using Backend.Common.Models.Users;

namespace Backend.Common.Interfaces.Users;

public interface IUsersRetriever
{
    Task LoginAsync(LoginUserRequest loginUserRequest);
}
