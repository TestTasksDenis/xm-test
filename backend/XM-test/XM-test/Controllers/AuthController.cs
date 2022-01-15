using Microsoft.AspNetCore.Mvc;
using XM_test.Models;

namespace XM_test.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : Controller
{
    /// <summary>Get Current User</summary>
    /// <response code="200">Returns Data according to the User Model</response>
    [HttpGet("current", Name = "GetCurrentUser")]
    [ProducesResponseType(typeof(UserModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesErrorResponseType(typeof(void))]
    public ActionResult<UserModel> GetUser()
    {
        return Ok(new UserModel
        {
            Id = 1,
            FirstName = "Denis",
            LastName = "Lubchenko",
            MiddleName = "Viktorovich",
            Email = "rexar1988@gmail.com",
            Password = "Secret_word!",
            PhoneNumber = "380916346852"
        });
    }

    /// <summary>Login user to the site</summary>
    /// <param name="dto">Login object</param>
    /// <response code="200">Return 200 status if User has been logged in</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginDto), StatusCodes.Status201Created)]
    [ProducesErrorResponseType(typeof(void))]
    public ActionResult<UserModel> Login([FromBody] LoginDto dto)
    {
        if (dto.Email == "guest@gmail.com" && dto.Password == "guest")
        {
            Thread.Sleep(2000);

            const string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiRGVuaXMiLCJsYXN0X25hbWUiOiJMdWJjaGVua28iLCJtaWRkbGVfbmFtZSI6IlZpa3Rvcm92aWNoIiwiZW1haWwiOiJyZXhhcjE5ODhAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiMzgwOTE2MzQ2ODUyIiwicGFzc3dvcmQiOiJTZWNyZXRfd29yZCEifSwic2NvcGVzIjpbImRhc2hib2FyZCJdfQ.RBwnLWC0Kwo-gZROi7Ux5LBrs3SAZDJlh6umvHjOrk0";
            
            return Ok(new
            {
                type = "Bearer",
                accessToken = token
            });
        }

        return Ok(null);
    }
}