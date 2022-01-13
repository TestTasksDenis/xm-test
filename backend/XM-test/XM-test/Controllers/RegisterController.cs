using Microsoft.AspNetCore.Mvc;
using XM_test.Models;

namespace XM_test.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class RegisterController : Controller
{
    /// <summary>Get Rules for Register User</summary>
    /// <response code="200">Returns Rules according Validation Model</response>
    [HttpGet("rules", Name = "GetRegisterRules")]
    [ProducesResponseType(typeof(RuleModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesErrorResponseType(typeof(void))]
    public ActionResult<List<RuleModel>> GetRules()
    {
        var rules = new List<RuleModel>
        {
            new()
            {
                Type = "text",
                Name = "first_name",
                Label = "First Name",
                Required = true,
                Validations = new List<ValidationModel>
                {
                    new()
                    {
                        Name = "pattern",
                        Message = "Only English characters are allowed.",
                        Value = "^[a-zA-Z0-9]*$",
                    }
                }
            },
            new()
            {
                Type = "text",
                Name = "middle_name",
                Label = "Middle Name",
                Required = true,
                Validations = new List<ValidationModel>
                {
                    new()
                    {
                        Name = "pattern",
                        Message = "Only English characters are allowed.",
                        Value = "^[a-zA-Z0-9]*$",
                    },
                    new()
                    {
                        Name = "maxlength",
                        Message = "Must be less than 63 characters.",
                        Value = "63",
                    }
                }
            },
            new()
            {
                Type = "text",
                Name = "last_name",
                Label = "Last Name",
                Required = true,
                Validations = new List<ValidationModel>
                {
                    new()
                    {
                        Name = "pattern",
                        Message = "Only English characters are allowed.",
                        Value = "^[a-zA-Z0-9]*$",
                    },
                    new()
                    {
                        Name = "maxlength",
                        Message = "Must be less than 63 characters.",
                        Value = "63",
                    }
                }
            },
            new()
            {
                Type = "email",
                Name = "email",
                Label = "Email",
                Required = true,
                Validations = new List<ValidationModel>
                {
                    new()
                    {
                        Name = "pattern",
                        Message = "Only English characters are allowed.",
                        Value = "^[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,}$",
                    },
                    new()
                    {
                        Name = "maxlength",
                        Message = "Must be less than 47 characters.",
                        Value = "46",
                    }
                }
            },
            new()
            {
                Type = "phone",
                Name = "phone_number",
                Label = "Mobile number",
                Required = true,
                Validations = new List<ValidationModel>
                {
                    new()
                    {
                        Name = "pattern",
                        Message = "Only numbers are allowed.",
                        Value = "^[0-9]+$",
                    },
                    new()
                    {
                        Name = "maxlength",
                        Message = "Must be less than 10 characters.",
                        Value = "10",
                    },
                    new()
                    {
                        Name = "minlength",
                        Message = "Must not be less than 4 characters.",
                        Value = "4",
                    }
                }
            },
            new()
            {
                Type = "password",
                Name = "password",
                Label = "Password",
                Required = true,
                Validations = new List<ValidationModel>
                {
                    new()
                    {
                        Name = "maxlength",
                        Message = "Must be less than 15 characters.",
                        Value = "15",
                    },
                    new()
                    {
                        Name = "minlength",
                        Message = "Must not be less than 8 characters.",
                        Value = "8",
                    },
                    new()
                    {
                        Name = "pattern",
                        Message = "1 or more numbers.",
                        Value = "^.*[0-9].*$",
                    },
                    new()
                    {
                        Name = "pattern",
                        Message = "1 or more lower case letters.",
                        Value = "^.*[a-z].*$",
                    },
                    new()
                    {
                        Name = "pattern",
                        Message = "1 or more upper case letters.",
                        Value = "^.*[A-Z].*$",
                    }
                }
            },
        };
        
        return Ok(rules);
    }
    
    /// <summary>Register User</summary>
    /// <param name="dto">UserModel object</param>
    /// <response code="201">Creates and returns User data which has been created</response>
    [HttpPost("register")]
    [ProducesResponseType(typeof(UserModel), StatusCodes.Status201Created)]
    [ProducesErrorResponseType(typeof(void))]
    public ActionResult<UserModel> Register([FromBody] UserModel dto)
    {
        if (dto == null)
        {
            return BadRequest(new
            {
                title = "Bad Request",
                status = 400,
            });
        }
        
        return CreatedAtRoute(
            "GetCurrentUser",
            new
            {
                id = 1
            },
            new
            {
                user = new
                {
                    id = 1,
                    first_name = dto.FirstName,
                    last_name = dto.LastName,
                    middle_name = dto.MiddleName,
                    email = dto.Email,
                    phone_number = dto.PhoneNumber   
                },
                token = new {
                    type = "Bearer",
                    accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiRGVuaXMiLCJsYXN0X25hbWUiOiJMdWJjaGVua28iLCJtaWRkbGVfbmFtZSI6IlZpa3Rvcm92aWNoIiwiZW1haWwiOiJyZXhhcjE5ODhAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiMzgwOTE2MzQ2ODUyIiwicGFzc3dvcmQiOiJTZWNyZXRfd29yZCEifSwic2NvcGVzIjpbImRhc2hib2FyZCJdfQ.RBwnLWC0Kwo-gZROi7Ux5LBrs3SAZDJlh6umvHjOrk0"
                }
            }
        );
    }
    
    /// <summary>Get 500 Server Error for testing</summary>
    /// <response code="500">Server error</response>
    [HttpGet("fake-server-error")]
    [ProducesResponseType(typeof(RuleModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesErrorResponseType(typeof(void))]
    public ActionResult<List<RuleModel>> GetServerError()
    {
        return StatusCode(500);
    }
}