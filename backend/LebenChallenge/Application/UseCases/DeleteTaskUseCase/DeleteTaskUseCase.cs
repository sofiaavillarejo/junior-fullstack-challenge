using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;

namespace LebenChallenge.Application.UseCases;

public class DeleteTaskUseCase : IDeleteTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public DeleteTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public Task ExecuteAsync(DeleteTaskDTO taskToDelete)
    {
        throw new NotImplementedException("DeleteTaskUseCase is not implemented yet.");
    }
}
