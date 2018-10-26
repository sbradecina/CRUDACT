using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EfCore.Domain;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private  IEmployeeRepository employeeRepo;
        public EmployeesController(IEmployeeRepository employeeRepo)
        {
            this.employeeRepo = employeeRepo;
        }
        // GET: api/Employees
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Employee>))]
        public IEnumerable<Employee> Get()
        {
            return employeeRepo.Retrieve()
                .ToList();
        }

        // GET: api/Employees/5
        [HttpGet("{id}", Name = "GetEmployeeID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Employee))]
        public ActionResult<Employee> Get(Guid id)
        {
            try
            {
                var result = employeeRepo.Retrieve()
                    .FirstOrDefault((c) => c.EmployeeID == id);
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

        // POST: api/Employees
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Employee))]
        public ActionResult<Employee> Post([FromBody] Employee employee)
        {
            try
            {
                employee.EmployeeID = Guid.NewGuid();
                employeeRepo.CreateAsync(employee);
                return CreatedAtRoute("GetEmployeeID",
                    new
                    {
                        id = employee.EmployeeID
                    },
                    employee);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Employee))]
        public async Task<ActionResult<Employee>> PutAsync(Guid id, [FromBody] Employee employee)
        {
            {
                try
                {
                    var result = employeeRepo.Retrieve().FirstOrDefault(x => x.EmployeeID == id);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    await employeeRepo.UpdateAsync(id, employee);

                    return Ok(employee);
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
        public ActionResult<Employee> Delete(Guid id)
        {
            try
            {
                var result = employeeRepo.Retrieve()
                    .FirstOrDefault((empl) => empl.EmployeeID == id);
                if (result == null)
                {
                    return NotFound();
                }
                employeeRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
