using Amazon;
using MyCoolWebAPI.IoC;

// Builder and configurations
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
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
services
    .AddContentfulClient(configuration)
    .AddHttpClient()
    .AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
