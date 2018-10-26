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
    public class CustomersController : ControllerBase
    {
        private ICustomerRepository customerRepo;

        public CustomersController(ICustomerRepository customerRepo)
        {
            this.customerRepo = customerRepo;
        }
        // GET: api/Categories
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return customerRepo.Retrieve()
                .ToList();
        }

        // GET: api/Categories/5
        [HttpGet("{id}", Name = "GetCustomerByID")]
        public ActionResult<Customer> Get(Guid id)
        {
            try
            {
                var result = customerRepo.Retrieve()
                    .FirstOrDefault((c) => c.CustomerID == id);
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

        // POST: api/Categories
        [HttpPost]
        public ActionResult<Customer> Post([FromBody] Customer customer)
        {
            try
            {
                customer.CustomerID = Guid.NewGuid();
                customerRepo.Create(customer);
                return CreatedAtRoute("GetCustomerByID",
                    new
                    {
                        id = customer.CustomerID
                    },
                    customer);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public ActionResult<Customer> Put(Guid id, [FromBody] Customer customer)
        {
            try
            {
                var result = customerRepo.Retrieve()
                            .FirstOrDefault(ctg => ctg.CustomerID == id);
                if (result == null)
                {
                    return NotFound();

                }
                customerRepo.Update(id, customer);
                return Ok(customer);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<Customer> Delete(Guid id)
        {
            try
            {
                var result = customerRepo.Retrieve()
                    .FirstOrDefault((ctg) => ctg.CustomerID == id);
                if (result == null)
                {
                    return NotFound();
                }
                customerRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
