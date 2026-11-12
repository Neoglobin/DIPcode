namespace API.Responses;

public class BaseResponse
{
    public bool Success { get; set; } = true;

    public List<string> Errors { get; set; } = [];
}