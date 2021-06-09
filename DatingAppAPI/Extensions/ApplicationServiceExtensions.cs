namespace DatingAppAPI.Extensions
{
    using DatingAppAPI.Data;
    using DatingAppAPI.Services;
    using DatingAppAPI.Services.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            //SERVICES
            services.AddScoped<ITokenService, TokenService>();

            //DB CONTEXT
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DatingAppConnection"));
            });

            return services;
        }
    }
}