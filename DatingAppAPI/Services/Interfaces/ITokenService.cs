namespace DatingAppAPI.Services.Interfaces
{
    using DatingAppAPI.Entities;

    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}