using DAL1.models;
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
    public UserDTO? userO { get; set; }
    public UserDTO? userR { get; set; }
    public int? UserCodeRequest { get; set; }


    //public string? MatchedName { get; set; }

    //public string? MatchedPhone { get; set; }

    //public string? MatchedEmail { get; set; }
    //public string? city { get; set; }
    public string? Date { get; set; }



    public List<DaysToworkDTO> DaysToworks { get; set; } = new List<DaysToworkDTO>();
    //public List<ProfessionDTO> Professions { get; set; } = new List<ProfessionDTO>();

    public UserDTO? user { get; set; } 

}