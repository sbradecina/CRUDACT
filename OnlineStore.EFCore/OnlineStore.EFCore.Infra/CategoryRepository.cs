using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using OnlineStore.EFCore.Domain;
using System.Linq;

namespace OnlineStore.EFCore.Infra
{
    public class CategoryRepository 
        : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(OnlineStoreDbContext context) : base(context)
        {
        }

        public PaginationResult<Category> RetrieveCategoryWithPagination(int page, int itemPerPage, string filter)
        {   
            PaginationResult<Category> result = new PaginationResult<Category>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Category>().OrderBy(x => x.CategoryName)
              .Skip(page).Take(itemPerPage).ToList();
                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Category>().Count();
                }


            }
            else
            {
                result.Results = context.Set<Category>()
                .Where(x=> x.CategoryName.ToLower().Contains(filter.ToLower()))
                    .OrderBy(x => x.CategoryName)
               .Skip(page).Take(itemPerPage).ToList();
                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Category>().Where(x => x.CategoryName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
}
