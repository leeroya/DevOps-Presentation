

https://hub.docker.com/_/microsoft-dotnet-framework-wcf
docker pull mcr.microsoft.com/dotnet/framework/wcf


https://hub.docker.com/_/microsoft-dotnet-framework-aspnet/
docker pull mcr.microsoft.com/dotnet/framework/aspnet


https://hub.docker.com/_/microsoft-dotnet-framework-sdk/
docker pull mcr.microsoft.com/dotnet/framework/sdk


https://github.com/Microsoft/mssql-docker


https://github.com/microsoft/mssql-docker/tree/master/windows/mssql-server-windows-express


docker run -d -p 1433:1433 -v C:/temp/:C:/temp/ -e sa_password=<YOUR SA PASSWORD> -e ACCEPT_EULA=Y -e attach_dbs="<DB-JSON-CONFIG>" microsoft/mssql-server-windows-express



web
https://training.play-with-docker.com/nodejs-live-debugging/

docker-compose up
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach",
            "type": "node",
            "request": "attach",
            "port": 5858,
            "address": "localhost",
            "restart": true,
            "sourceMaps": false,
            "outDir": null,
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "/code"
        }
    ]
}