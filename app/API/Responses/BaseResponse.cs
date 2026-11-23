using System.Runtime.Serialization;

namespace API.Responses;

public enum BaseResponseStatuses
{
    Success = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    InternalServerError = 500
}

[DataContract]
public class BaseResponse
{
    [DataMember(Name = "success")]
    public bool IsSuccess { get; set; } = true;

    [DataMember(Name = "errorMessage")]
    public string ErrorMessage { get; set; } = string.Empty;

    [DataMember(Name = "status")]
    public int Status { get; set; } = (int)BaseResponseStatuses.Success;

    public static BaseResponse Success()
        => new BaseResponse();

    public static BaseResponse Error(string errorMessage, 
        BaseResponseStatuses status = BaseResponseStatuses.BadRequest)
    {
        return new BaseResponse
        {
            IsSuccess = false,
            ErrorMessage = errorMessage,
            Status = (int)status
        };
    }
}

[DataContract]
public sealed class BaseResponse<TResult> : BaseResponse
{
    [DataMember(Name = "result")]
    public TResult Result { get; private set; } = default;

    public static BaseResponse<TResult> Success(TResult result)
        => new BaseResponse<TResult> { Result = result };
}