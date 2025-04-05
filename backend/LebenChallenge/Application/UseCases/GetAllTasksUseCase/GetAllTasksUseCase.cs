using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class GetAllTasksUseCase : IGetAllTasksUseCase
{
    private readonly ITaskRepository _taskRepository;

    public GetAllTasksUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public Task<IEnumerable<TaskItem>> ExecuteAsync()
    {
        throw new NotImplementedException("GetAllTasksUseCase is not implemented yet.");
    }
}
