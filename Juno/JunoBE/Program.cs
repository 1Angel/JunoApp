using System.Text;
using Azure.Storage.Blobs;
using JunoBE.Common.Authorization;
using JunoBE.Common.Services;
using JunoBE.Data;
using JunoBE.Features.Address;
using JunoBE.Features.Bookmarks;
using JunoBE.Features.Cookies;
using JunoBE.Features.Properties;
using JunoBE.Features.ProperyImage;
using JunoBE.Features.User;
using JunoBE.Features.User.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//identity
builder.Services.AddIdentity<UserEntity, IdentityRole>().AddEntityFrameworkStores<AppDbContext>();

//authentication - jwt
builder.Services.AddAuthentication(x =>
{
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuer = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:JwtKey"])),
    };
        options.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx =>
        {
            ctx.Request.Cookies.TryGetValue("accessToken", out var accessToken);
            if (!string.IsNullOrEmpty(accessToken))
                ctx.Token = accessToken;
            return Task.CompletedTask;
        }
    };
});

//jwt settings
builder.Services.AddScoped<TokenService>();
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(JwtSettings.SectionName));

//cookies
builder.Services.AddScoped<CookieService>();

//current-user
builder.Services.AddScoped<CurrentUser>();

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
builder.Services.AddScoped<PropertyimageService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<BookmarkService>();

//mappers
builder.Services.AddSingleton<PropertiesMapper>();
builder.Services.AddSingleton<AddressMapper>();
builder.Services.AddSingleton<PropertyImageMapper>();
builder.Services.AddSingleton<UserMapper>();

//azure
builder.Services.AddSingleton<IUploadService, UploadService>();
builder.Services.AddSingleton(_ => new BlobServiceClient(builder.Configuration.GetConnectionString("azureConn")));

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
