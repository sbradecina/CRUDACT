using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IDriverRepository : IRepository<Driver>
    {
        PaginationResult<Driver> RetrieveDriverWithPagination(int page, int itemsPerPage, string filter);
    }
}
