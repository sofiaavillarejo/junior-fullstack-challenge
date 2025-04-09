using LebenChallenge.Application.DTO;
using LebenChallenge.Domain;

namespace LebenChallenge.Application.UseCases;

public interface ICompleteTaskUseCase
{
    Task<TaskItem> ExecuteAsync(int id);
}
