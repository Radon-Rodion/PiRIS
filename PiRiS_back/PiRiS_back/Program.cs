/*List<List<decimal>> researched = new List<List<decimal>>();
int n = 7;
for (int i = 0; i<= n; i++)
{
    researched.Add(new List<decimal>());
}
decimal dx = (decimal)Math.Pow(0.1, n);
for(int i=0; i< n; i++)
{
    researched[0].Add((decimal)Math.Pow(1 + (double)dx * i, 1 + (double)dx * i));
}
for(int i=1; i<n; i++)
{
    for(int j=0; j < n - i; j++)
    {
        researched[i].Add((researched[i - 1][j + 1] - researched[i - 1][j]) / dx);
    }
}

List<decimal> res = new List<decimal>();
for(int i=0; i<n; i++)
{
    res.Add(researched[i][0]);
}*/


using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using PiRiS_back.Models;
using PiRiS_back;
using PiRiS_back.Middleware;
using Microsoft.EntityFrameworkCore;
using PiRiS_back.Services;
using PiRiS_back.Enums;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Server.IISIntegration;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.Configure<BankAccConfig>(configuration.GetSection("Accounts"));
services.AddTransient<UserInfoFillerService>();
services.AddTransient<AccountsService>();
services.AddSingleton<ContractsServiceSingletone>();
services.AddScoped<IdentityNameFilter>();
services.AddScoped<AuthFilter>();
services.AddControllers();
services.AddSession();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddCors(options =>
{
    options.AddPolicy("AllowAllHeaders",
        builder =>
        {
            builder.WithOrigins("http://localhost:3033")
                    .AllowCredentials()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
                .AddNegotiate();

services.AddAuthorization(options =>
{
    // By default, all incoming requests will be authorized according to the default policy.
    options.FallbackPolicy = options.DefaultPolicy;
});

var accountsConfiguration = configuration.GetRequiredSection("Accounts");

services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));
services.AddDatabaseDeveloperPageExceptionFilter();

services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true).AddRoles<IdentityRole<int>>()
    .AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

var app = builder.Build();

//app.UseCors("AllowAllHeaders");
//app.UseCors(policy => policy.AllowCredentials().AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3033"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();
app.MapControllers();

app.Run();
