using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using JunoBE.Features.User.Dtos;

namespace JunoBE.Features.User
{
    public class UserValidator: AbstractValidator<LoginUserDto>
    {
        public UserValidator()
        {
            RuleFor(x=>x.email)
            .EmailAddress().WithMessage("Email no valido")
            .NotEmpty().WithMessage("El email es obligatorio");
            
            
            RuleFor(x=>x.password)
            .NotEmpty().WithMessage("La contraseña es obligatoria")
            .MaximumLength(20).WithMessage("La contraseña no debe contener mas de 20 caracteres")
            .MinimumLength(4).WithMessage("La contraseña debe de tener mas de 4 caracteres");
        }
    }
}