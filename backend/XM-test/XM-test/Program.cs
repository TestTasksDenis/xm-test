using System.Reflection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "XM Fake Backend",
        Version = "v1"
    });
                
    string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    string xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                
    options.IncludeXmlComments(xmlPath);
                
    options.UseInlineDefinitionsForEnums();
});

const string corsProfile = "XMCors";
string[] domains = {
    "http://localhost:4200"
};
            
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsProfile, builder =>
    {
        builder.WithOrigins(domains)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (!app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsProfile);

app.UseAuthorization();

app.MapControllers();

app.Run();
