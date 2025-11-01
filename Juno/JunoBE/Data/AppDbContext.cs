using JunoBE.Features.Address;
using JunoBE.Features.Properties;
using JunoBE.Features.ProperyImage.Entity;
using Microsoft.EntityFrameworkCore;

namespace JunoBE.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PropertyEntity> properties { get; set; }
        public DbSet<AddressEntity> addresses { get; set; }
        public DbSet<PropertiesImageEntity> propertiesImages { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<PropertyEntity>()
        //     .Property(x => x.homeStatus)
        //     .HasConversion<string>();
        //     base.OnModelCreating(modelBuilder);
        // }

    }
}