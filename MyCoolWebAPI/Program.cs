using Amazon.SimpleSystemsManagement;
using Contentful.AspNetCore;
using Microsoft.Extensions.Configuration;

// Builder and configurations
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var _configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddSystemsManager("/Contentful")
    .Build();



// Add services to the container.
services
    .AddContentful(_configuration)
    .AddControllers();
_configuration.GetValue<string>("/Contentful");
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
