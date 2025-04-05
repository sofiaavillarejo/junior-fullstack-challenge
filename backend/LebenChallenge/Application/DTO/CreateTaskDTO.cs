namespace LebenChallenge.Application.DTO;

public struct CreateTaskDTO
{
    public string Name { get; }
    public string Description { get; }
    public DateTime DueDate { get; }

    public CreateTaskDTO(string name, string description, DateTime dueDate)
    {
        Name = name;
        Description = description;
        DueDate = dueDate;
    }
}
