using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Entities.LearningStarter.Entities;
using LearningStarter.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace LearningStarter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();

            services.AddHsts(options =>
            {
                options.MaxAge = TimeSpan.MaxValue;
                options.Preload = true;
                options.IncludeSubDomains = true;
            });

            services.AddDbContext<DataContext>(options =>
            {
                // options.UseInMemoryDatabase("FooBar");
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            //TODO
            services.AddMvc();

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Events.OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                });

            services.AddAuthorization();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Learning Starter Server",
                    Version = "v1",
                    Description = "Description for the API goes here.",
                });

                c.CustomOperationIds(apiDesc => apiDesc.TryGetMethodInfo(out var methodInfo) ? methodInfo.Name : null);
                c.MapType(typeof(IFormFile), () => new OpenApiSchema { Type = "file", Format = "binary" });
            });

            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "learning-starter-web/build";
            });

            services.AddHttpContextAccessor();

            // configure DI for application services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            dataContext.Database.EnsureDeleted();
            dataContext.Database.EnsureCreated();
            
            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(options =>
            {
                options.SerializeAsV2 = true;
            }); ;

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Learning Starter Server API V1");
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(x => x.MapControllers());

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "learning-starter-web";
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3001");
                }
            });

            SeedUsers(dataContext);

            SeedSubscribers(dataContext);
            SeedEmailNewsletters(dataContext); 
            SeedInventories(dataContext);
            SeedBulletJournalEntries(dataContext);
            SeedOnlineStores(dataContext);
        }

        private void SeedSubscribers(DataContext dataContext)
        {
            if (!dataContext.Subscribers.Any())
            {
                var seededSubscriber = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "First Last",
                    Email = "email.aol" 
                };
                dataContext.Subscribers.Add(seededSubscriber);
                dataContext.SaveChanges();
            }
        }
        private void SeedSubscribers1(DataContext dataContext)
        {
            if (!dataContext.Subscribers.Any())
            {
                var seededSubscriber = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "Kearney Butler",
                    Email = "email@gmail.com"
                };
                dataContext.Subscribers.Add(seededSubscriber);
                dataContext.SaveChanges();
            }
        }

        private void SeedSubscribers2(DataContext dataContext)
        {
            if (!dataContext.Subscribers.Any())
            {
                var seededSubscriber = new Subscriber
                {
                    DateSubscribed = DateTimeOffset.Now,
                    Name = "John soe",
                    Email = "Johnsoe.aol"
                };
                dataContext.Subscribers.Add(seededSubscriber);
                dataContext.SaveChanges();
            }
        }

        private void SeedEmailNewsletters(DataContext dataContext)
        {
            if (!dataContext.EmailNewsletters.Any())
            {
                var seededEmailNewsletter = new EmailNewsletter
                {
                    DateSent = DateTimeOffset.Now,
                    Title = "Welcome!",
                    Message = "Hi, Welcome to your Virtual Newsletter!" 
                };
                dataContext.EmailNewsletters.Add(seededEmailNewsletter);
                dataContext.SaveChanges();
            }
        }





        private void SeedOnlineStores(DataContext dataContext) 
        { 
            if (!dataContext.Onlinestores.Any())
            {
                var seededOnlineStores = new OnlineStores
                {
                    StoreName = "Ebay",
                    ListingFees = .35,
                    SellingFees = 1.065,
                    Taxes = 1.0845,
                    Country = "United States of America",
                    Region = "Louisisana",
                };
                
                var seededOnlineStores1 = new OnlineStores
                {
                    StoreName = "Etsy",
                    ListingFees = .2,
                    SellingFees = 1.065,
                    Taxes = 1.0845,
                    Country = "United States of America",
                    Region = "Louisisana",
                };
                dataContext.Onlinestores.Add(seededOnlineStores);
                dataContext.Onlinestores.Add(seededOnlineStores1);
                dataContext.SaveChanges();
                

            }
        }
        private void SeedInventories(DataContext dataContext)
        {
            if (!dataContext.Inventories.Any()) {
                var seededInventory = new Inventories
                {
                    ItemName = "BlueDress",
                    ProductionCost = 12.00,
                    Quantity = 4, 
                    GrossTotal = 35.54,
                    Availabilty = "Yes",
                    OnlineStoreId = 1,
                    SiteListing = 43.23,
                    DateAdded = "2/3/12",
                };
                dataContext.Inventories.Add(seededInventory);
                dataContext.SaveChanges();

            }
               
        }


        private void SeedBulletJournalEntries(DataContext dataContext)
        {
            if (!dataContext.BulletJournalEntries.Any())
            {
                var seededBulletJournalEntry = new BulletJournalEntry
                {
                    DateCreated = DateTimeOffset.Now,
                    Contents = "Do Somthing",
                    IsDone = false,
                    Pushes = 0
                };

                dataContext.BulletJournalEntries.Add(seededBulletJournalEntry);
                dataContext.SaveChanges();
            }

        }

        public void SeedUsers(DataContext dataContext)
        {

            var numUsers = dataContext.Users.Count();

            if (numUsers == 0)
            {
                var seededUser = new User
                {
                    FirstName = "Seeded",
                    LastName = "User",
                    Username = "admin",
                    Password = "password",
                    Email = "Email"
                };



                dataContext.Users.Add(seededUser);
                dataContext.SaveChanges();
            }

        }
        
    }
}