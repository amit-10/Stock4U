using System.ComponentModel.DataAnnotations;
using Backend.Common.Interfaces.Users;
using Backend.Common.Models.Users;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Backend.Dal.Lib;

public class UsersRetriever(
    IMongoHandler mongoHandler,
    MongoConfiguration mongoConfiguration,
    ILogger<UsersUpdater> logger) : IUsersRetriever
{
    private readonly IMongoCollection<Users> _usersCollection =
        mongoHandler.GetCollection<Users>(mongoConfiguration.UsersCollectionName);

    public async Task LoginAsync(LoginUserRequest loginUserRequest)
    {
        var existingUser = await _usersCollection.Find(u => u.Username == loginUserRequest.Username && u.Password == loginUserRequest.Password).FirstOrDefaultAsync();
        if (existingUser == null)
        {
            logger.LogError("Could not login {@user} - username or password are incorrect", loginUserRequest);
            throw new Exception("Could not login - username or password are incorrect");
        }
    }
}
