using JunoBE.Features.Address;
using JunoBE.Features.Bookmarks;
using JunoBE.Features.Properties;
using JunoBE.Features.ProperyImage.Entity;
using JunoBE.Features.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JunoBE.Data
{
    public class AppDbContext : IdentityDbContext<UserEntity>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PropertyEntity> properties { get; set; }
        public DbSet<AddressEntity> addresses { get; set; }
        public DbSet<PropertiesImageEntity> propertiesImages { get; set; }
        public DbSet<BookmarkEntity> bookmarks { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<PropertyEntity>()
        //     .Property(x => x.homeStatus)
        //     .HasConversion<string>();
        //     base.OnModelCreating(modelBuilder);
        // }

    }
}