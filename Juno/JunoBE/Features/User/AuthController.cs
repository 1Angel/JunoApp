using System.Net;
using FluentValidation;
using Humanizer;
using JunoBE.Common;
using JunoBE.Common.Authorization;
using JunoBE.Features.Cookies;
using JunoBE.Features.User.Dtos;
using JunoBE.Features.User.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JunoBE.Features.User
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly UserService _userService;
        private readonly UserMapper userMapper;
        private readonly TokenService tokenService;
        private readonly CookieService cookieService;
        private readonly CurrentUser _currentUser;
        public AuthController(UserService userService, UserMapper userMapper, TokenService tokenService, CookieService cookieService, CurrentUser currentUser)
        {
            _userService = userService;
            this.userMapper = userMapper;
            this.tokenService = tokenService;
            this.cookieService = cookieService;
            _currentUser = currentUser;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Hola()
        {
            Response.Cookies.Append("hola", "este es el mensaje que estare enviando");
            return Ok($"hola {_currentUser.getUserId()}");
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse>> Register([FromBody] RegisterUserDto register)
        {
            var user = await _userService.finByEmail(register.email);
            if (user != null)
            {
                return BadRequest(new {errors = "El usuario ya existe", error= HttpStatusCode.BadRequest});
            }

            var newUser = userMapper.ToEntity(register);
            var create = await _userService.CreateUser(newUser, register.password);

            if (!create.Succeeded)
            {
                foreach (var i in create.Errors)
                {
                    return BadRequest(new { message = i.Description, error = i.Code });
                }
            }

            //generated token jiji
            var token = tokenService.GenerateAccessToken(newUser);
            cookieService.setCookie("accessToken",token, HttpContext);
            return Ok(new {message= "Created", token = token});
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginUserDto login)
        {
            var user = await _userService.finByEmail(login.email);
            if (user == null)
            {
                return BadRequest(new {message= "El usuario no existe", status = HttpStatusCode.BadRequest});
            }

            var comparePassword = await _userService.ComparePassword(user, login.password);
            if (!comparePassword)
            {
                return BadRequest(new {message= "La contraseña no coincide", status = HttpStatusCode.BadRequest});
            }

            var token = tokenService.GenerateAccessToken(user);
            cookieService.setCookie("accessToken",token, HttpContext);

            return Ok(new {message ="Logged In", token = token});
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            cookieService.DeleteCookie("accessToken", HttpContext);
            return Ok();
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return Ok(await _userService.getCurrentUser(_currentUser.getUserId()));
        }
        
    }
}