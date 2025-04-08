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

    public async Task ExecuteAsync(DeleteTaskDTO taskToDelete)
    {
        var task = await _taskRepository.GetByIdAsync(taskToDelete.Id);
        if (task == null)
        {
            throw new Exception("Task not found");
        }
        await _taskRepository.DeleteAsync(taskToDelete.Id);
    }
}
