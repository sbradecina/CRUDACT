using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private IPersonRepository personRepo;

        public PersonController(IPersonRepository personRepo)
        {
            this.personRepo = personRepo;
        }
        // GET: api/Person
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return personRepo.Retrieve()
                .ToList();
        }

        // GET: api/Person/5
        [HttpGet("{id}", Name = "GetPersonByID")]
        public ActionResult<Person> Get(Guid id)
        {
            try
            {
                var result = personRepo.Retrieve()
                    .FirstOrDefault((c) => c.PersonID == id);
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
        // POST: api/Person
        [HttpPost]
        public ActionResult<Person> Post([FromBody] Person person)
        {
            try
            {
                personRepo.Create(person);
                return CreatedAtRoute("GetPersonByID",
                    new
                    {
                        id = person.PersonID
                    },
                    person);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Person/5
        [HttpPut("{id}")]
        public ActionResult<Person> Put(Guid id, [FromBody] Person person)
        {
            try
            {
                var result = personRepo.Retrieve()
                            .FirstOrDefault(ctg => ctg.PersonID == id);
                if (result == null)
                {
                    return NotFound();

                }
                personRepo.Update(id, person);
                return Ok(person);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<Person> Delete(Guid id)
        {
            try
            {
                var result = personRepo.Retrieve()
                    .FirstOrDefault((ctg) => ctg.PersonID == id);
                if (result == null)
                {
                    return NotFound();
                }
                personRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        // GET: api/Person/5
        [HttpGet("{page}/{itemPerPage}", Name = "GetPersonWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Person>))]
        public async Task<ActionResult<PaginationResult<Person>>> Get(int page, int itemPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Person>();
                result = personRepo.RetrievePersonWithPagination(page, itemPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
