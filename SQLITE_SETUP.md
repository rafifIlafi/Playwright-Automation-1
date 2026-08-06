# SQLite Setup Guide

This guide explains how to set up and use SQLite database for this project.

## What is SQLite?

SQLite is a self-contained, file-based SQL database. It requires no server setup and is perfect for:
- Development environments
- Small to medium-sized applications
- Applications that need embedded database
- Easy deployment and backup

## Advantages of Using SQLite

✅ **No server required** - No need to install or configure a database server
✅ **Zero configuration** - Works out of the box
✅ **Portable** - Database is a single file that can be easily backed up or moved
✅ **Fast** - Optimized for embedded use cases
✅ **Reliable** - ACID compliant with over 30 years of development

## Setup Instructions

### 1. Environment Configuration

Make sure your `.env` file contains:

```env
DATABASE_URL="file:./dev.db"
```

The database file (`dev.db`) will be created automatically in the project root directory.

### 2. Initialize Database

Run the following commands to create the database schema and seed initial data:

```bash
# Generate Prisma Client
bun run prisma generate

# Push schema to database
bun run db:push

# Seed database with admin users and sample data
bun run seed
```

### 3. Database Location

By default, the SQLite database file will be created at:
- Development: `./dev.db` (in project root)
- Custom location: Can be specified in `.env` file

Example custom location:
```env
DATABASE_URL="file:./db/custom.db"
```

## Database Management

### View Database with Prisma Studio

```bash
bun run db:studio
```

This will open Prisma Studio in your browser where you can:
- View and edit all tables
- Add, update, and delete records
- Run queries
- Inspect relationships

### Backup Database

Since SQLite is a single file, backing up is as simple as copying the file:

```bash
# Create a backup
cp dev.db backup_$(date +%Y%m%d).db

# Or use tar for compression
tar -czf backup_$(date +%Y%m%d).tar.gz dev.db
```

### Restore Database

```bash
# Restore from backup
cp backup_20240101.db dev.db
```

## Production Considerations

While SQLite is excellent for development and small applications, consider these points for production:

### When to Use SQLite in Production

✅ **Single server deployment**
✅ **Low to medium traffic** (< 100,000 writes/day)
✅ **Simple backup requirements**
✅ **No need for horizontal scaling**

### When to Consider Other Databases

❌ **Multiple application servers** (need concurrent write access)
❌ **High write volume** (> 100,000 writes/day)
❌ **Need for horizontal scaling**
❌ **Advanced replication or sharding**

### Production Best Practices

1. **Use WAL Mode** (Write-Ahead Logging) for better concurrency:
   ```sql
   PRAGMA journal_mode=WAL;
   ```

2. **Regular backups** - Set up automated backups

3. **Monitor database size** - SQLite databases should generally be kept under 140GB

4. **Enable foreign keys** (already in Prisma schema):
   ```sql
   PRAGMA foreign_keys=ON;
   ```

## Troubleshooting

### Database Locked Error

If you encounter "database is locked" errors:

1. Ensure only one process is writing to the database
2. Close Prisma Studio if it's open
3. Restart your development server

### File Permissions

Ensure the application has write permissions to the database file and directory:

```bash
chmod 664 dev.db
```

### Corrupted Database

If the database becomes corrupted:

1. Restore from backup
2. Use SQLite's built-in recovery:
   ```bash
   sqlite3 dev.db ".recover" | sqlite3 recovered.db
   ```

## Migration to Other Databases

If you need to migrate to MySQL or PostgreSQL later:

1. Export data from SQLite
2. Update `prisma/schema.prisma` provider
3. Update `.env` DATABASE_URL
4. Run `bun run db:push`
5. Import data

## Resources

- [Official SQLite Documentation](https://www.sqlite.org/docs.html)
- [Prisma SQLite Guide](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [SQLite Appropriate Uses](https://www.sqlite.org/whentouse.html)

## Support

If you encounter issues:

1. Check the [troubleshooting section](#troubleshooting) above
2. Review [Prisma documentation](https://www.prisma.io/docs)
3. Check the main project [README.md](./README.md)

---

Last updated: 2024
