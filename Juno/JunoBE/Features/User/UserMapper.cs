using JunoBE.Features.User.Dtos;

namespace JunoBE.Features.User
{
    public static class UserMapper
    {
        public static UserEntity ToEntity(RegisterUserDto registerUserDto)
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

        public static UserDto ToDto(UserEntity user)
        {
            return new UserDto(user.Id, user.first_name, user.last_name, user.Email);
        }
    }
}