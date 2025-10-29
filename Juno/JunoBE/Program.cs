using JunoBE.Data;
using JunoBE.Features.Address;
using JunoBE.Features.Properties;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("dbconn"));
});

//cors config
builder.Services.AddCors(options =>
{
    options.AddPolicy("nextFE", config =>
    {
        config.AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod();
    });
});



//services
builder.Services.AddScoped<PropertiesService>();

//mappers
builder.Services.AddSingleton<PropertiesMapper>();
builder.Services.AddSingleton<AddressMapper>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("nextFE");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
