using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : ControllerBase
    {
        private IWarehouseRepository warehouseRepo;

        public WarehouseController(IWarehouseRepository warehouseRepo)
        {
            this.warehouseRepo = warehouseRepo;
        }
        // GET: api/Warehouse
        [HttpGet]
        public IEnumerable<Warehouse> Get()
        {
            return warehouseRepo.Retrieve()
                .ToList();
        }

        // GET: api/Warehouse/5
        [HttpGet("{id}", Name = "GetWarehouseID")]
        public ActionResult<Warehouse> Get(Guid id)
        {
            try
            {
                var result = warehouseRepo.Retrieve()
                    .FirstOrDefault((c) => c.WarehouseID == id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Warehouse
        [HttpPost]
        public ActionResult<Warehouse> Post([FromBody] Warehouse warehouse)
        {
            try
            {
                warehouse.WarehouseID = Guid.NewGuid();
                warehouseRepo.Create(warehouse);
                return CreatedAtRoute("GetWarehouseID",
                    new
                    {
                        id = warehouse.WarehouseID
                    },
                    warehouse);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Warehouse/5
        [HttpPut("{id}")]
        public ActionResult<Warehouse> Put(Guid id, [FromBody] Warehouse warehouse)
        {
            try
            {
                var result = warehouseRepo.Retrieve()
                            .FirstOrDefault(ctg => ctg.WarehouseID == id);
                if (result == null)
                {
                    return NotFound();

                }
                warehouseRepo.Update(id, warehouse);
                return Ok(warehouse);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<Warehouse> Delete(Guid id)
        {
            try
            {
                var result = warehouseRepo.Retrieve()
                    .FirstOrDefault((ctg) => ctg.WarehouseID == id);
                if (result == null)
                {
                    return NotFound();
                }
                warehouseRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/warehouse/5
        [HttpGet("{page}/{itemPerPage}", Name = "GetwarehouseWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Warehouse>))]
        public async Task<ActionResult<PaginationResult<Warehouse>>> Get(int page, int itemPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Warehouse>();
                result = warehouseRepo.RetrieveWarehouseWithPagination(page, itemPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
