using LebenChallenge.Domain;
namespace LebenChallenge.Application.Interfaces;
using LebenChallenge.Application.DTO;

public interface IUpdateTaskUseCase
{
    Task<TaskItem> ExecuteAsync(int id, UpdateTaskDTO taskToUpdate);
}

