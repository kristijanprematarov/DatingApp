using DatingAppAPI.Data;
using DatingAppAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppAPI.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")] //api/buggy/auth
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")] //api/buggy/not-found
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")] //api/buggy/server-error
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);

            var thingToReturn = thing.ToString();//thingToReturn will be null => method on null => NullReference Exception => that is our goal

            return thingToReturn;
        }

        [HttpGet("bad-request")] //api/buggy/bad-request
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest();
        }
    }
}