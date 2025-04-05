namespace LebenChallenge.Application.DTO;

public struct CompleteTaskDTO
{
    public int Id { get; }

    public CompleteTaskDTO(int id)
    {
        Id = id;
    }
}
