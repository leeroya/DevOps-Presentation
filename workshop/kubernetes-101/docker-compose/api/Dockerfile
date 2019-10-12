FROM mcr.microsoft.com/dotnet/core-nightly/sdk AS build-env
WORKDIR /app

COPY Demo.Api/Demo.Api.csproj Demo.Api.csproj
RUN dotnet restore Demo.Api.csproj
COPY Demo.Api/. .
RUN dotnet publish Demo.Api.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/core-nightly/aspnet:3.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Demo.Api.dll"]