using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class CompleteTaskUseCase : ICompleteTaskUseCase
{
    private readonly ITaskRepository _taskRepository;

    public CompleteTaskUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null)
        {
            throw new Exception("Task not found");
        }

        task.MarkAsCompleted();
        return await _taskRepository.UpdateAsync(task);
    }
}
