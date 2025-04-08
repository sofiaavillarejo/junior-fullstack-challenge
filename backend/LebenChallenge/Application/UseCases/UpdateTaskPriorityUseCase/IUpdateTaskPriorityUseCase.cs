using LebenChallenge.Application.DTO;
using LebenChallenge.Domain;
namespace LebenChallenge.Application.UseCases;

public interface IUpdateTaskPriorityUseCase
{
    Task<TaskItem> ExecuteAsync(int id, UpdateTaskPriorityDTO taskPriority);
}

