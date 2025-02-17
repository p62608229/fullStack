using System;
using System.Collections.Generic;

namespace DAL1.models;

public partial class Request
{
    public int RequestCode { get; set; }

    public string RequestUserId { get; set; } = null!;

    public DateTime Date { get; set; }

    public double Tohour { get; set; }

    public int? UserCodeOffers { get; set; }

    public int Profession { get; set; }

    public string? AddressProfession { get; set; }

    public string? Note { get; set; }

    public int? CameThroughFriend { get; set; }

    public string? City { get; set; }

    public double? Fromhour { get; set; }

    public bool? Calander { get; set; }

    public string? MatchedName { get; set; }

    public string? MatchedPhone { get; set; }

    public string? MatchedEmail { get; set; }

    public virtual User RequestUser { get; set; } = null!;

    public virtual Offer? UserCodeOffersNavigation { get; set; }
}
