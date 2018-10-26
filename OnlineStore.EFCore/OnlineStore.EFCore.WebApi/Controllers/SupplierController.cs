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
    public class SupplierController : ControllerBase
    {
        private ISupplierRepository shipperRepo;

        public SupplierController(ISupplierRepository shipperRepo)
        {
            this.shipperRepo = shipperRepo;
        }
        // GET: api/Supplier
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Supplier>))]
        public ActionResult<IEnumerable<Supplier>> Get()
        {

            return Ok(shipperRepo.Retrieve().ToList());
        }

        // GET: api/Supplier/5
        [HttpGet("{id}", Name = "GetSupplierByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Supplier))]
        public async Task<ActionResult<Supplier>> Get(Guid id)
        {
            try
            {
                var result = await shipperRepo.RetrieveAsync(id);
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

        // POST: api/Supplier
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Supplier))]
        public async Task<ActionResult<Supplier>> Post([FromBody] Supplier shipper)
        {
            try
            {
                shipper.SupplierID = Guid.NewGuid();
                await shipperRepo.CreateAsync(shipper);
                return CreatedAtRoute("GetSupplierByID",
                new
                {
                    id = shipper.SupplierID
                },
                shipper);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Supplier/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Supplier))]
        public async Task<ActionResult<Supplier>> Put(Guid id, [FromBody] Supplier shipper)
        {
            try
            {
                var result = shipperRepo.Retrieve().FirstOrDefault(x => x.SupplierID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await shipperRepo.UpdateAsync(id, shipper);

                return Ok(shipper);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = shipperRepo.Retrieve().FirstOrDefault(x => x.SupplierID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await shipperRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Supplier/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetSupplierWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Supplier>))]
        public async Task<ActionResult<PaginationResult<Supplier>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Supplier>();
                result = shipperRepo.RetrieveSupplierWithPagination(page, itemsPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}