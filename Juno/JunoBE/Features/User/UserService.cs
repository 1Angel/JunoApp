using Microsoft.AspNetCore.Identity;

namespace JunoBE.Features.User
{
    public class UserService
    {
        private readonly UserManager<UserEntity> _userManager;

        public UserService(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
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
    }
}