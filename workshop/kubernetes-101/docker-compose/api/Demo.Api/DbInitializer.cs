using System;
using System.Linq;

namespace Demo.Api
{
    public static class DbInitializer
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        
         public static void Initialize(DemoContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Forecasts.Any())
            {
                return;   // DB has been seeded
            }
            var rng = new Random();
            var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
            foreach (WeatherForecast forecast in forecasts)
            {
                context.Forecasts.Add(forecast);
            }
            context.SaveChanges();
        }
    }
}