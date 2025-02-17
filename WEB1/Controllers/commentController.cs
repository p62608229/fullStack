using BLL.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Windows.Input;
using BLL.func;
using BLL.interfaces;
using System.Collections.Generic;
using BLL1.func;
using DAL1.models;
namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class commentController : ControllerBase

    {
        IcommentBll commentBll;

        public commentController(IcommentBll cbll)
        {
            commentBll = cbll;
        }


        [HttpGet]
        public ActionResult<List<CommentDTO>> get()
        {
            return Ok(commentBll.GetComments());
        }
        [HttpPost]
        //public ActionResult<List<CommentDTO>> Addcomment(CommentDTO c)

        public ActionResult<CommentDTO> Addcomment(CommentDTO c)
        {
            return Ok(commentBll.AddComment(c));
            //}


        }


    }
    }
