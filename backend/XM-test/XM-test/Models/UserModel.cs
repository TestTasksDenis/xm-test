using System.Text.Json.Serialization;

namespace XM_test.Models;

public class UserModel
{
    public int Id { get; set; }

    [JsonPropertyName("first_name")]
    public string FirstName { get; set; }
    
    [JsonPropertyName("last_name")]
    public string LastName { get; set; }
    
    [JsonPropertyName("middle_name")]
    public string MiddleName { get; set; }
    
    public string Email { get; set; }
    
    [JsonPropertyName("phone_number")]
    public string PhoneNumber { get; set; }
    
    public string Password { get; set; }
}