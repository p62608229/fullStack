using System;
using System.Collections.Generic;

namespace DALL.models;

public partial class Profession
{
    public int ProfessionCode { get; set; }

    public string Profession1 { get; set; } = null!;

    public string? OfferUserId { get; set; }

    public virtual User? OfferUser { get; set; }

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
