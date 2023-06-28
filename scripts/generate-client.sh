echo "Please ensure you have bff project up and running..."

echo "Running api generator"

dotnet run --project ../APIClientGenerator http://localhost:5164/swagger/v1/swagger.json ../_spa/src/clients/client.ts