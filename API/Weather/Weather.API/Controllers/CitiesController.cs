using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Weather.API.Data;
using Weather.API.Models;

namespace Weather.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesConttroler : Controller
    {
        private readonly AppDbContext dbContext;

        public CitiesConttroler(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // List of cities
        [HttpGet]     
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await dbContext.Cities.ToListAsync();
            return Ok(cities);
        }

        // Single city
        [HttpGet]
        [Route("{id:guid}")] // Route only accepts guid types
        [ActionName("GetCity")]
        public async Task<IActionResult> GetCity([FromRoute] Guid id)
        {

            var city= await dbContext.Cities.FirstOrDefaultAsync(c=>c.Id==id);
            if (city == null)
            {
                return NotFound("City was not found");
            }
            else return Ok(city);
        }

        // Create city
        [HttpPost]
        public async Task<IActionResult> AddCity([FromBody] City city)
        {
            city.Id = Guid.NewGuid(); // Creating new cityId

            await dbContext.Cities.AddAsync(city); // Adding city to DB
            await dbContext.SaveChangesAsync(); // Saving changes in DB

            return CreatedAtAction(nameof(GetCity), new {id=city.Id},  city);
            //return Ok(city);
        }

        // Update city

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCity([FromRoute] Guid id, [FromBody] City city)
        {
            var cityFromDb= await dbContext.Cities.FirstOrDefaultAsync(c=>c.Id==id);
            if (cityFromDb != null)
            {
                cityFromDb.Name = city.Name;
                cityFromDb.Country = city.Country;
                cityFromDb.Population = city.Population;
                await dbContext.SaveChangesAsync();

                return Ok(cityFromDb);
            }
            else return NotFound("City was not found");
        }

        // Delete City

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCity([FromRoute] Guid id)
        {
            var cityFromDb = await dbContext.Cities.FirstOrDefaultAsync(c => c.Id == id);
            if (cityFromDb != null)
            {
                dbContext.Remove(cityFromDb);
                await dbContext.SaveChangesAsync();
                return Ok(cityFromDb);
            }
            else return NotFound("City was not found");
        }

    }
}