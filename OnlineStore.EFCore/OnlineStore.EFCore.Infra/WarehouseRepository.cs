using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class WarehouseRepository : RepositoryBase<Warehouse>, IWarehouseRepository
    {
        public WarehouseRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Warehouse> RetrieveWarehouseWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Warehouse> result = new PaginationResult<Warehouse>();

            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Warehouse>()
                .OrderBy(x => x.WarehouseName)
                .Skip(page)
                .Take(itemsPerPage)
                .ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Warehouse>().Count();

                }
            }
            else
            {
                result.Results = context.Set<Warehouse>()
                .Where(x => x.WarehouseName.ToLower().Contains(filter.ToLower()))
                .OrderBy(x => x.WarehouseName)
                .Skip(page)
                .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Warehouse>()
                    .Where(x => x.WarehouseName.ToLower().Contains(filter.ToLower()))
                    .Count();

                }
            }


            return result;
        }
    }
}