using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EfCore.Domain;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private IDriverRepository driverRepo;
        public DriversController(IDriverRepository driverRepo)
        {
            this.driverRepo = driverRepo;
        }
        // GET: api/Drivers
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Driver>))]
        public IEnumerable<Driver> Get()
        {
            return driverRepo.Retrieve()
                .ToList();
        }


        // GET: api/Drivers/5
        [HttpGet("{id}", Name = "GetDriverByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Driver>))]
        public async Task<ActionResult<Driver>> Get(Guid id)
        {
            var result = await driverRepo.RetrieveAsync(id);
            return Ok(result);
        }




        // GET: api/Drivers/5
        [HttpGet("{page}/{itemPerPage}", Name = "GetDriverWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Driver>))]
        public async Task<ActionResult<PaginationResult<Driver>>> Get(int page, int itemPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Driver>();
                result = driverRepo.RetrieveDriverWithPagination(page, itemPerPage, filter);
                
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        // POST: api/Drivers
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Driver))]
        public ActionResult<Driver> Post([FromBody] Driver driver)
        {
            try
            {
                driver.DriversID = Guid.NewGuid();
                driverRepo.CreateAsync(driver);
                return CreatedAtRoute("GetDriverByID",
                    new
                    {
                        id = driver.DriversID
                    },
                    driver);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Drivers/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Driver))]
        public async Task<ActionResult<Driver>> PutAsync(Guid id, [FromBody] Driver driver)
        {
            {
                try
                {
                    var result = driverRepo.Retrieve().FirstOrDefault(x => x.DriversID == id);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    await driverRepo.UpdateAsync(id, driver);

                    return Ok(driver);
                }
                catch (Exception)
                {
                    return BadRequest();
                }

            }
        }


        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public ActionResult<Driver> Delete(Guid id)
        {
            try
            {
                var result = driverRepo.Retrieve()
                    .FirstOrDefault((empl) => empl.DriversID == id);
                if (result == null)
                {
                    return NotFound();
                }
                driverRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
