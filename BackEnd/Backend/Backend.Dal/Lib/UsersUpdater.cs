using System.ComponentModel.DataAnnotations;
using Backend.Common.Interfaces.Users;
using Backend.Common.Models.Users;
using Backend.Dal.Configuration;
using Backend.Dal.Interfaces;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace Backend.Dal.Lib;

public class UsersUpdater(
    IMongoHandler mongoHandler,
    MongoConfiguration mongoConfiguration,
    ILogger<UsersUpdater> logger) : IUsersUpdater
{
    private readonly IMongoCollection<Users> _usersCollection =
        mongoHandler.GetCollection<Users>(mongoConfiguration.UsersCollectionName);

    public async Task RegisterAsync(RegisterUserRequest registerUserRequest)
    {
        var existingUser = await _usersCollection.Find(u => u.Username == registerUserRequest.Username).FirstOrDefaultAsync();
        if (existingUser != null)
        {
            logger.LogError("A user with username: {username} already exists.", registerUserRequest.Username);
            throw new Exception("A user with username: " + registerUserRequest.Username + " already exists.");
        }
        Users newUser = new Users {
            Email = registerUserRequest.Email,
            Username = registerUserRequest.Username,
            Password = registerUserRequest.Password
        };
        await _usersCollection.InsertOneAsync(newUser);
    }
}
