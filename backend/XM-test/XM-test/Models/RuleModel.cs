namespace XM_test.Models;

public class RuleModel
{
    public string Type { get; set; }
    
    public string Name { get; set; }
    
    public string Label { get; set; }
    
    public bool Required { get; set; }

    public List<ValidationModel> Validations { get; set; }
}