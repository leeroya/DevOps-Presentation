FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app

COPY Demo.Api/Demo.Api.csproj Demo.Api.csproj
RUN dotnet restore Demo.Api.csproj
RUN dotnet publish Demo.Api.csproj -c Release -o out

FROM microsoft/dotnet:2.2-aspnetcore-runtime

WORKDIR /app
COPY --from=build-env /app/Demo.Api/out .
ENTRYPOINT ["dotnet", "Demo.Api.dll"]