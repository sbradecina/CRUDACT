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
    public class PositionController : ControllerBase
    {
        private IPositionRepository positionRepo;

        public PositionController(IPositionRepository positionRepo)
        {
            this.positionRepo = positionRepo;
        }
        // GET: api/Position
        [HttpGet]
        public IEnumerable<Position> Get()
        {
            return positionRepo.Retrieve()
                .ToList();
        }

        // GET: api/Position/5
        [HttpGet("{id}", Name = "GetPositionByID")]
        public ActionResult<Position> Get(Guid id)
        {
            try
            {
                var result = positionRepo.Retrieve()
                    .FirstOrDefault((c) => c.PositionID == id);
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

        // POST: api/Position
        [HttpPost]
        public ActionResult<Position> Post([FromBody] Position position)
        {
            try
            {
                position.PositionID = Guid.NewGuid();
                positionRepo.Create(position);
                return CreatedAtRoute("GetPositionByID",
                    new
                    {
                        id = position.PositionID
                    },
                    position);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Position/5
        [HttpPut("{id}")]
        public ActionResult<Position> Put(Guid id, [FromBody] Position position)
        {
            try
            {
                var result = positionRepo.Retrieve()
                            .FirstOrDefault(ctg => ctg.PositionID == id);
                if (result == null)
                {
                    return NotFound();

                }
                positionRepo.Update(id, position);
                return Ok(position);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<Position> Delete(Guid id)
        {
            try
            {
                var result = positionRepo.Retrieve()
                    .FirstOrDefault((ctg) => ctg.PositionID == id);
                if (result == null)
                {
                    return NotFound();
                }
                positionRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Position/5
        [HttpGet("{page}/{itemPerPage}", Name = "GetPositionWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Position>))]
        public async Task<ActionResult<PaginationResult<Position>>> Get(int page, int itemPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Position>();
                result = positionRepo.RetrievePositionWithPagination(page, itemPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
