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

services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .WithOrigins("http://localhost:3000", "nguyen-kenny.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddHsts(options =>
{
    options.IncludeSubDomains = true;
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi3();
} else
{
    app.UseHsts();
    app.UseHttpsRedirection();

}

app.MapHealthChecks("/health", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
{
    AllowCachingResponses = false
});

app.MapControllers();
app.UseCors();
app.Run();
