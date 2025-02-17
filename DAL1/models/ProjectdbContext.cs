using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL1.models;

public partial class ProjectdbContext : DbContext
{
    public ProjectdbContext()
    {
    }

    public ProjectdbContext(DbContextOptions<ProjectdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<DaysTowork> DaysToworks { get; set; }

    public virtual DbSet<Offer> Offers { get; set; }

    public virtual DbSet<Profession> Professions { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-8AAN4BN0\\SQLEXPRESS; Database=projectdb;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentCode).HasName("PK__Comment__F87E749E3B21DA3C");

            entity.ToTable("Comment");

            entity.Property(e => e.CommentCode).HasColumnName("commentCode");
            entity.Property(e => e.CommentUserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("commentUserId");
            entity.Property(e => e.ContentCommentv)
                .HasMaxLength(100)
                .HasColumnName("contentCommentv");
            entity.Property(e => e.Rating)
                .HasDefaultValueSql("((0))")
                .HasColumnName("rating");

            entity.HasOne(d => d.CommentUser).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CommentUserId)
                .HasConstraintName("FK__Comment__comment__38996AB5");
        });

        modelBuilder.Entity<DaysTowork>(entity =>
        {
            entity.HasKey(e => e.DayCode);

            entity.ToTable("DaysTowork");

            entity.Property(e => e.DayCode).HasColumnName("dayCode");
            entity.Property(e => e.Date)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("date");
            entity.Property(e => e.Fromhour).HasColumnName("fromhour");
            entity.Property(e => e.OfferCode).HasColumnName("offerCode");
            entity.Property(e => e.Tohour).HasColumnName("tohour");

            entity.HasOne(d => d.OfferCodeNavigation).WithMany(p => p.DaysToworks)
                .HasForeignKey(d => d.OfferCode)
                .HasConstraintName("FK_DaysTowork_Offer");
        });

        modelBuilder.Entity<Offer>(entity =>
        {
            entity.HasKey(e => e.OfferCode).HasName("PK__Offer__8E46173054988309");

            entity.ToTable("Offer");

            entity.Property(e => e.OfferCode)
                .ValueGeneratedNever()
                .HasColumnName("offerCode");
            entity.Property(e => e.Note)
                .HasMaxLength(60)
                .HasColumnName("note");
            entity.Property(e => e.OfferUserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("offerUserId");
            entity.Property(e => e.PriceForWork).HasColumnName("priceForWork");
            entity.Property(e => e.PricePerVisit).HasColumnName("pricePerVisit");
            entity.Property(e => e.Profession).HasColumnName("profession");

            entity.HasOne(d => d.OfferUser).WithMany(p => p.Offers)
                .HasForeignKey(d => d.OfferUserId)
                .HasConstraintName("FK_Offer_Users");
        });

        modelBuilder.Entity<Profession>(entity =>
        {
            entity.HasKey(e => e.ProfessionCode).HasName("PK__Professi__22BCE8D97BC00B38");

            entity.ToTable("Profession");

            entity.Property(e => e.ProfessionCode).HasColumnName("professionCode");
            entity.Property(e => e.OfferUserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("offerUserId");
            entity.Property(e => e.Profession1)
                .HasMaxLength(18)
                .HasColumnName("profession");

            entity.HasOne(d => d.OfferUser).WithMany(p => p.Professions)
                .HasForeignKey(d => d.OfferUserId)
                .HasConstraintName("FK__Professio__offer__3D5E1FD2");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestCode).HasName("PK__Requests__2A7301B09B8C953D");

            entity.ToTable("Request");

            entity.Property(e => e.RequestCode).HasColumnName("requestCode");
            entity.Property(e => e.AddressProfession)
                .HasMaxLength(25)
                .HasColumnName("addressProfession");
            entity.Property(e => e.Calander).HasDefaultValueSql("('false')");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.MatchedEmail)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("matchedEmail");
            entity.Property(e => e.MatchedName)
                .HasMaxLength(15)
                .HasColumnName("matchedName");
            entity.Property(e => e.MatchedPhone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("matchedPhone");
            entity.Property(e => e.Note)
                .HasMaxLength(60)
                .HasColumnName("note");
            entity.Property(e => e.Profession).HasColumnName("profession");
            entity.Property(e => e.RequestUserId)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("requestUserId");

            entity.HasOne(d => d.RequestUser).WithMany(p => p.Requests)
                .HasForeignKey(d => d.RequestUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Requests_Users");

            entity.HasOne(d => d.UserCodeOffersNavigation).WithMany(p => p.Requests)
                .HasForeignKey(d => d.UserCodeOffers)
                .HasConstraintName("FK_Request_Offer");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F80F2A240");

            entity.Property(e => e.Id)
                .HasMaxLength(9)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(25)
                .HasColumnName("address");
            entity.Property(e => e.City)
                .HasMaxLength(10)
                .HasColumnName("city");
            entity.Property(e => e.FirstName)
                .HasMaxLength(8)
                .HasColumnName("firstName");
            entity.Property(e => e.HouseNumber).HasColumnName("houseNumber");
            entity.Property(e => e.LastName)
                .HasMaxLength(10)
                .HasColumnName("lastName");
            entity.Property(e => e.Mail)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("mail");
            entity.Property(e => e.Password)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Postalcode).HasColumnName("postalcode");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
