using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface IGetAllTasksUseCase
{
    Task<IEnumerable<TaskItem>> ExecuteAsync();
}
