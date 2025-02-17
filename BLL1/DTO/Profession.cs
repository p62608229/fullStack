using System;
using System.Collections.Generic;

namespace BLL.DTO;
public partial class ProfessionDTO
{
    public int ProfessionCode { get; set; }

    public string Profession1 { get; set; } = null!;

    public string? OfferUserId { get; set; }
}

 