using Backend.Common.Interfaces.Users;
using Backend.Common.Models.Users;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
namespace Backend.Dal.Lib;

public class UsersHandler(
    IMongoHandler mongoHandler,
    MongoConfiguration mongoConfiguration,
    ILogger<PositionsRetriever> logger) : IUsersHandler
{
    private readonly IMongoCollection<User> _usersCollection =
    mongoHandler.GetCollection<User>(mongoConfiguration.UserPositionsCollectionName);

    public async Task RegisterAsync(User user)
    {
        try
        {
            var filter = Builders<User>.Filter.Eq(user => "Email", user.Email);
            var existingUser = _usersCollection.Find(filter).FirstOrDefault();
            if (existingUser == null) {
                 var newUser = new User
                 {
                    Email = user.Email,
                    Username = user.Username,
                    Password = user.Password
                 };
                 await _usersCollection.InsertOneAsync(newUser);
            }

        }
        catch (Exception exception)
        {
            logger.LogError(exception, "User with email address {email} already exists", user.Email);
            throw;
        }

        // return userInvestmentStatus;
    }

}