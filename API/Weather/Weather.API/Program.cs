using Microsoft.EntityFrameworkCore;
using Weather.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var CS = builder.Configuration.GetConnectionString("WeatherDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(o =>
o.UseSqlServer(CS)
);

string defaultCorsPolicy = "default";
// Cross-Origin Resource Sharing configuration
// (controls which servers and websites have permission to request access to resources)
builder.Services.AddCors((setup) =>
    setup.AddPolicy(defaultCorsPolicy, (options) =>
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()
));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(defaultCorsPolicy);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
