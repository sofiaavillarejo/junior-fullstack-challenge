using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class GetTaskByIdUseCase : IGetTaskByIdUseCase
{
    private readonly ITaskRepository _taskRepository;

    public GetTaskByIdUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public Task<TaskItem> ExecuteAsync(int id)
    {
        throw new NotImplementedException("GetTaskByIdUseCase is not implemented yet.");
    }
}
