using System;
using System.Collections.Generic;

namespace BLL.DTO;
public partial class OfferDTO
{
    public int OfferCode { get; set; }

    public string? OfferUserId { get; set; }

    public int PriceForWork { get; set; }

    public string? Note { get; set; }

    public int? PricePerVisit { get; set; }

    public int? Profession { get; set; }

}