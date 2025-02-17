using System;
using System.Collections.Generic;

namespace DAL1.models;

public partial class Offer
{
    public int OfferCode { get; set; }

    public string? OfferUserId { get; set; }

    public int? PriceForWork { get; set; }

    public string? Note { get; set; }

    public int? PricePerVisit { get; set; }

    public int? Profession { get; set; }

    public int? UserCodeRequest { get; set; }

    public virtual ICollection<DaysTowork> DaysToworks { get; set; } = new List<DaysTowork>();

    public virtual User? OfferUser { get; set; }

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
