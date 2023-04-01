namespace MyCoolWebAPI.IoC
{
    public static class Contentful
    {
        public static IServiceCollection AddContentfulClient(this IServiceCollection services, IConfiguration _configuration)
        {
            // fetch from secrets here
            return services;
        }
    }
}
