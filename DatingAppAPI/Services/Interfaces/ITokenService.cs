namespace DatingAppAPI.Services.Interfaces
{
    using System.Threading.Tasks;
    using DatingAppAPI.Entities;

    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}