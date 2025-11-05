using JunoBE.Features.User.Dtos;

namespace JunoBE.Features.User
{
    public class UserMapper
    {
        public UserEntity ToEntity(RegisterUserDto registerUserDto)
        {
            return new UserEntity
            {
                Email = registerUserDto.email,
                UserName = $"{registerUserDto.first_name}@{registerUserDto.last_name}",
                PhoneNumber = registerUserDto.phone_number,
                last_name = registerUserDto.last_name,
                first_name = registerUserDto.first_name,
                suscriptionStatus = "Inactive "
            };
        }

        public UserDto ToDto(UserEntity user)
        {
            return new UserDto
            {
                Id = user.Id,
                email = user.Email,
                first_name = user.first_name,
                last_name = user.last_name
            };
        }
    }
}