using System;
using System.Collections.Generic;

namespace BLL.DTO;

public partial class CommentDTO
{
    public int CommentCode { get; set; }

    public string? CommentUserId { get; set; }

    public string ContentCommentv { get; set; } = null!;
    public string? Namecomment { get; set; }

    
}
