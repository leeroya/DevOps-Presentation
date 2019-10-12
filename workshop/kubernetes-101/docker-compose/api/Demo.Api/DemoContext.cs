using Demo.Api.Controllers;
using Microsoft.EntityFrameworkCore;

namespace Demo.Api
{
    public class DemoContext: DbContext
    {
        public DemoContext (DbContextOptions<DemoContext> options)
            : base(options)
        {
        }
        
        public DbSet<WeatherForecast> Forecasts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WeatherForecast>().ToTable("WeatherForecasts");
        }
    }
}