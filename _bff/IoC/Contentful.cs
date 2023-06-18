using Contentful.AspNetCore;
using Contentful.Core;
using Contentful.Core.Configuration;

namespace BFF.IoC
{
    public static class Contentful
    {
        public static IServiceCollection AddContentfulClient(this IServiceCollection services, IConfiguration _configuration)
        {
            ContentfulOptions options = new ContentfulOptions
            {
                SpaceId = _configuration.GetValue<string>("spaceId"),
                ManagementApiKey = _configuration.GetValue<string>("managementapikey"),
                PreviewApiKey = _configuration.GetValue<string>("previewapikey"),
                DeliveryApiKey = _configuration.GetValue<string>("deliveryapikey")
            };
            
            services.AddTransient<IContentfulClient, ContentfulClient>((ip) =>
            {
                var client = ip.GetService<HttpClient>();
                return new ContentfulClient(client, options);
            });
            return services;
        }
    }
}