namespace DatingAppAPI.Extensions
{
    using DatingAppAPI.Data;
    using DatingAppAPI.Repositories;
    using DatingAppAPI.Repositories.Interfaces;
    using DatingAppAPI.Services;
    using DatingAppAPI.Services.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using DatingAppAPI.Helpers;

    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            //CLOUDINARY
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

            //REPOSITORIES
            services.AddScoped<IUserRepository, UserRepository>();

            //SERVICES
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<LogUserActivity>();

            //DB CONTEXT
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DatingAppConnection"));
            });

            return services;
        }
    }
}