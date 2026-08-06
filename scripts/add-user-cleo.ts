import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function addUser() {
  try {
    console.log('Adding user cleo...')

    const hashedPassword = await bcrypt.hash('cleo123', 10)

    const user = await prisma.user.upsert({
      where: { username: 'cleo' },
      update: {},
      create: {
        username: 'cleo',
        password: hashedPassword,
        role: 'admin',
      },
    })

    console.log('✓ User created/updated successfully!')
    console.log('Username:', user.username)
    console.log('Role:', user.role)
    console.log('Password: cleo123')
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addUser()
