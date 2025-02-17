using System;
using System.Collections.Generic;

namespace DALL.models;

public partial class Request
{
    public int RequestCode { get; set; }

    public string? OfferUserId { get; set; }

    public DateTime Date { get; set; }

    public double Hour { get; set; }

    public string? UserCodeOffers { get; set; }

    public int? Profession { get; set; }

    public string? AddressProfession { get; set; }

    public string? Note { get; set; }

    public int? CameThroughFriend { get; set; }

    public virtual User? OfferUser { get; set; }

    public virtual Profession? ProfessionNavigation { get; set; }

    public virtual User? UserCodeOffersNavigation { get; set; }
}
