﻿using OnlineStore.EfCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IPositionRepository : IRepository<Position>
    {
        PaginationResult<Position> RetrievePositionWithPagination(int page, int itemPerPage, string filter);

    }
}