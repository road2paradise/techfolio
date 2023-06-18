# Use the official .NET Core 6.0 SDK image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# Set the working directory to /app
WORKDIR /app

# Copy the .csproj file to the working directory
COPY *.csproj ./_bff/

# Restore NuGet packages
RUN dotnet restore

# Copy the rest of the application code to the working directory
COPY . ./

# Build the application
RUN dotnet publish -c Release -o out

# Create a new image from the base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set the working directory to /app
WORKDIR /app

# Copy the built application from the build image to the new image
COPY --from=build-env /app/out .

# Expose port 80
EXPOSE 80

# Start the application when the container starts
ENTRYPOINT ["dotnet", "BFF.dll"]
