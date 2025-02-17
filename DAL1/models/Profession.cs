using System;
using System.Collections.Generic;

namespace DAL1.models;

public partial class Profession
{
    public int ProfessionCode { get; set; }

    public string Profession1 { get; set; } = null!;

    public string? OfferUserId { get; set; }

    public virtual User? OfferUser { get; set; }
}
