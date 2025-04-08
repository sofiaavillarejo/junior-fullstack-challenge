using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface IGetTaskByIdUseCase
{
    Task<TaskItem> ExecuteAsync(int id);
}
