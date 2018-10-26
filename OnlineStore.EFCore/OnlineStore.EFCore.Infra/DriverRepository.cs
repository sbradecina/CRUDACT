using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class DriverRepository : RepositoryBase<Driver>, IDriverRepository
    {
        public DriverRepository(OnlineStoreDbContext context) : base(context)
        {
        }
        public PaginationResult<Driver> RetrieveDriverWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Driver> result = new PaginationResult<Driver>();

            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Driver>()
                .OrderBy(x => x.LastName)
                .Skip(page)
                .Take(itemsPerPage)
                .ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Driver>().Count();

                }
            }
            else
            {
                result.Results = context.Set<Driver>()
                .Where(x => x.LastName.ToLower().Contains(filter.ToLower()))
                .OrderBy(x => x.LastName)
                .Skip(page)
                .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Driver>()
                    .Where(x => x.LastName.ToLower().Contains(filter.ToLower()))
                    .Count();

                }
            }


            return result;
        }
    }
}
