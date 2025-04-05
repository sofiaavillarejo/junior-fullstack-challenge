using LebenChallenge.Application.DTO;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface ICreateTaskUseCase
{
    Task<TaskItem> ExecuteAsync(CreateTaskDTO taskToCreate);
}
