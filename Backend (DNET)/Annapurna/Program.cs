using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AnnapurnaAPI.Data;
using AnnapurnaAPI.Services;
using AnnapurnaAPI.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Database connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Use SQL Server with Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"] ?? "your-secret-key")),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "annapurna",
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "annapurna",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

// Register services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TiffinService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<RazorpayService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<JwtService>();

var app = builder.Build();

// Swagger UI only in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Create database and apply migrations
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();
        Console.WriteLine("Database created successfully!");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Error creating database: {ex.Message}");
    Console.WriteLine("Please ensure SQL Server LocalDB is running and accessible.");
}

app.Run();
