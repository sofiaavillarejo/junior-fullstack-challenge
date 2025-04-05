namespace LebenChallenge.Application.DTO;

public struct DeleteTaskDTO
{
    public int Id { get; }

    public DeleteTaskDTO(int id)
    {
        Id = id;
    }
}
