using CORE.Entities;
using FluentValidation;

namespace APPLICATION.Validation.AuthValidation;

public class EmailValidator : AbstractValidator<string>
{
    public EmailValidator()
    {
        RuleFor(email => email).NotEmpty().WithMessage("Email is required")
            .Matches(@"^[^@\s]+@[^@\s]+\.[^@\s]+$").WithMessage("Invalid email format");
    }
}