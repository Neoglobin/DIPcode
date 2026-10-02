using CORE.Entities;
using FluentValidation;

namespace APPLICATION.Validation.AuthValidation;

public class PasswordValidator : AbstractValidator<string>
{
    public PasswordValidator()
    {
        RuleFor(password => password).NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password cannot contain less than 8 characters")
            .MaximumLength(24).WithMessage("Password cannot be longer than 16 characters")
            .Matches(@"[A-Z]+").WithMessage("Password must contain at least one upper-case character")
            .Matches(@"[a-z]+").WithMessage("Password must contain at least one lower-case character")
            .Matches(@"[0-9]+").WithMessage("Password must contain at least one number")
            .Matches(@"[\!\?\*\.]+").WithMessage("Password must contain at least one special symbol");
    }
}