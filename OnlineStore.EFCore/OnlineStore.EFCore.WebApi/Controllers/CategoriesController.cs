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
    public class CategoriesController : ControllerBase
    {
        private ICategoryRepository categoryRepo;

        public CategoriesController(ICategoryRepository categoryRepo)
        {
            this.categoryRepo = categoryRepo;
        }
        // GET: api/Categories
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categoryRepo.Retrieve()
                .ToList();
        }

        // GET: api/Categories/5
        [HttpGet("{id}", Name = "GetCategoryByID")]
        public ActionResult<Category> Get(Guid id)
        {
            try
            {
                var result = categoryRepo.Retrieve()
                    .FirstOrDefault((c) => c.CategoryID == id);
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
        public ActionResult<Category> Post([FromBody] Category category)
        {
            try
            {
                category.CategoryID = Guid.NewGuid();
                categoryRepo.Create(category);
                return CreatedAtRoute("GetCategoryByID",
                    new
                    {
                        id = category.CategoryID
                    },
                    category);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public ActionResult<Category> Put(Guid id, [FromBody] Category category)
        {
            try
            {
                var result = categoryRepo.Retrieve()
                            .FirstOrDefault(ctg => ctg.CategoryID == id);
                if (result == null)
                {
                    return NotFound();

                }
                categoryRepo.Update(id, category);
                return Ok(category);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult<Category> Delete(Guid id)
        {
            try
            {
                var result = categoryRepo.Retrieve()
                    .FirstOrDefault((ctg) => ctg.CategoryID == id);
                if (result == null)
                {
                    return NotFound();
                }
                categoryRepo.Delete(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Category/5
        [HttpGet("{page}/{itemPerPage}", Name = "GetCategoryWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Category>))]
        public async Task<ActionResult<PaginationResult<Category>>> Get(int page, int itemPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Category>();
                result =  categoryRepo.RetrieveCategoryWithPagination(page, itemPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
