using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IWarehouseRepository : IRepository<Warehouse>
    {
        PaginationResult<Warehouse> RetrieveWarehouseWithPagination(int page, int itemsPerPage, string filter);
    }
}
