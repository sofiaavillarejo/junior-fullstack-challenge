using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public class UpdateTaskPriorityUseCase: IUpdateTaskPriorityUseCase
{
    private readonly ITaskRepository _taskRepository;

    public UpdateTaskPriorityUseCase(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<TaskItem> ExecuteAsync(int id, UpdateTaskPriorityDTO taskToUpdate)
    {
        TaskItem task = await _taskRepository.GetByIdAsync(id);
        if (task == null)
        {
            throw new Exception("Task not found");
        }
        task.SetPriority(taskToUpdate.Priority);
        return await _taskRepository.UpdateAsync(task);
    }
}

