using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EfCore.Domain;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private IDepartmentRepository departmentRepo;
        private IEmployeeRepository employeeRepo;

        public DepartmentsController(
            IDepartmentRepository departmentRepo,
            IEmployeeRepository employeeRepo)
        {
            this.departmentRepo = departmentRepo;
            this.employeeRepo = employeeRepo;
        }
        // GET: api/Departments
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Department>))]
        public ActionResult<IEnumerable<Department>> Get()
        {
            return departmentRepo.Retrieve()
                                 .ToList();
        }

        // GET: api/Departments/5
        [HttpGet("{id}", Name = "GetDepartmentById")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(Department))]
        public async Task<ActionResult<Department>> Get(Guid id)
        {
            try
            {
                var result = await departmentRepo.RetrieveAsync(id);
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

        [HttpGet("{id}/employees")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(List<Employee>))]
        //public ActionResult<List<Department>> GetDepartmentEmployees(Guid id)
        //{
        //    try
        //    {
        //        var result = employeeRepo.GetEmployeeByDepartment(id);

        //        if (result == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(result);

        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest();
        //    }
        //}

        // POST: api/Departments
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(201, Type = typeof(Department))]
        public async Task<ActionResult<Department>> Post([FromBody] Department department)
        {
            try
            {
                department.DepartmentID = Guid.NewGuid();

                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                await departmentRepo.CreateAsync(department);

                return CreatedAtRoute("GetDepartmentById",
                    new
                    {
                        id = department.DepartmentID
                    },
                    department);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        // PUT: api/Departments/5
        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(Department))]
        public async Task<ActionResult<Department>> Put(Guid id, [FromBody] Department department)
        {
            try
            {
                var result = departmentRepo.Retrieve()
                        .FirstOrDefault(d => d.DepartmentID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await departmentRepo.UpdateAsync(id, department);

                return Ok();

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = await departmentRepo.RetrieveAsync(id);
                if (result == null)
                {
                    return NotFound();
                }
                await departmentRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}