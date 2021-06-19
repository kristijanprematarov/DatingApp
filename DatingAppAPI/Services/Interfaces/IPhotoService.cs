namespace DatingAppAPI.Services.Interfaces
{
    using System.Threading.Tasks;
    using CloudinaryDotNet.Actions;
    using Microsoft.AspNetCore.Http;
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
        //each file we upload is going to be given an id
    }
}