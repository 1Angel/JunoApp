using JunoBE.Features.User.Dtos;
using Microsoft.AspNetCore.Identity;

namespace JunoBE.Features.User
{
    public class UserService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly UserMapper _userMapper;

        public UserService(UserManager<UserEntity> userManager, UserMapper userMapper)
        {
            _userManager = userManager;
            _userMapper = userMapper;
        }

        public async Task<UserEntity> finByEmail(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<UserEntity> findByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public async Task<bool> ComparePassword(UserEntity userEntity, string password)
        {
            return await _userManager.CheckPasswordAsync(userEntity, password);
        }

        public async Task<IdentityResult> CreateUser(UserEntity user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<UserDto> getCurrentUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return _userMapper.ToDto(user!);
        }
    }
}