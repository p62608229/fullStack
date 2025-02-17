using System;
using System.Collections.Generic;

namespace BLL.DTO;
public partial class RequestDTO
{
    public int RequestCode { get; set; }

    public string? OfferUserId { get; set; }

    public DateTime Date { get; set; }

    public Double Hour { get; set; }

    public string? UserCodeOffers { get; set; }

    public int? Profession { get; set; }

    public string? AddressProfession { get; set; }

    public string? Note { get; set; }

    public int? CameThroughFriend { get; set; }

  
}
