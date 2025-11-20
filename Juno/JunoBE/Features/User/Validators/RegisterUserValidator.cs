using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using JunoBE.Features.User.Dtos;

namespace JunoBE.Features.User.Validators
{
    public class RegisterUserValidator: AbstractValidator<RegisterUserDto>
    {
        public RegisterUserValidator()
        {
            RuleFor(x=>x.first_name)
            .NotEmpty()
            .WithMessage("El nombre es obligatorio");
            
            RuleFor(x=>x.last_name)
            .NotEmpty()
            .WithMessage("El Apellido es obligatorio");
            
            RuleFor(x=>x.email)
            .EmailAddress().WithMessage("Email no valido")
            .NotEmpty().WithMessage("El email es obligatorio");
            
            RuleFor(x=>x.phone_number)
            .NotEmpty()
            .WithMessage("El numero telefonico es obligatorio");

            RuleFor(x=>x.password)
            .NotEmpty().WithMessage("La contraseña es obligatoria")
            .MaximumLength(20).WithMessage("La contraseña no debe contener mas de 20 caracteres")
            .MinimumLength(4).WithMessage("La contraseña debe de tener mas de 4 caracteres");        }
    }
}