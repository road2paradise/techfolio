using Amazon;
using BFF.IoC;

// Builder and configurations
var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var _configuration = configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddSystemsManager("/contentful/", new Amazon.Extensions.NETCore.Setup.AWSOptions
    {
        Region = RegionEndpoint.APSoutheast2
    })
    .AddJsonFile("appsettings.json", false, true)
    .AddJsonFile("appsettings.Development.json", false, true);

// Add services to the container.
var services = builder.Services;
services
    .AddSwaggerDocument()
    .AddContentfulClient(configuration)
    .AddHttpClient()
    .AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
// Configure CORS
services.AddHealthChecks();
services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseOpenApi();
app.UseSwaggerUi3();
app.UseHttpsRedirection();

app.MapControllers();
app.UseCors();
app.Run();
