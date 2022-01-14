# XM Test Task

## Launch project with Docker
`docker compose up`

If you run backend from docker you have to generate SSL certificate, use next commands for this:
```
dotnet dev-certs https -ep <PATH_TO_THE_PROJECT>/docker/ssl/aspnetapp.pfx -p crypticpassword

dotnet dev-certs https --trust
```

## Launch Frontend
- `cd <PATH_TO_THE_PROJECT>/frontend`
- `ng serve`

## Launch Backend
- `cd <PATH_TO_THE_PROJECT>/backend/XM-test/XM-test`
- `dotnet run`

### Swagger
https://localhost:5000/swagger/index.html
