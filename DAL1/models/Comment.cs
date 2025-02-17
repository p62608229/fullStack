using System;
using System.Collections.Generic;

namespace DAL1.models;

public partial class Comment
{
    public int CommentCode { get; set; }

    public string? CommentUserId { get; set; }

    public string ContentCommentv { get; set; } = null!;

    public int? Rating { get; set; }

    public virtual User? CommentUser { get; set; }
}
