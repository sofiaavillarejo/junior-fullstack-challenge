using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases
{
    public class UpdateTaskUseCase : IUpdateTaskUseCase
    {
        private readonly ITaskRepository _taskRepository;

        public UpdateTaskUseCase(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<TaskItem> ExecuteAsync(int id, UpdateTaskDTO taskToUpdate)
        {
            TaskItem task = await _taskRepository.GetByIdAsync(id);
            if(task == null)
            {
                throw new Exception("Task not found");
            }
            task.UpdateTask(taskToUpdate.Name, taskToUpdate.Description, taskToUpdate.DueDate);
            return await _taskRepository.UpdateAsync(task);
        }
    }
}
