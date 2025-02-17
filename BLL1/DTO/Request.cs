using DAL1.models;
using System;
using System.Collections.Generic;

namespace BLL.DTO;
public partial class RequestDTO
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

   
    public UserDTO? userR { get; set; }
    public UserDTO? userO { get; set; }


}
