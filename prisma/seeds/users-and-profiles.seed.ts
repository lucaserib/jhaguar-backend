import { PrismaClient, Gender, Status } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsersAndProfiles(
  prisma: PrismaClient,
): Promise<void> {
  console.log('Seeding users and profiles...');
  const saltRounds = 10;
  const defaultPassword = await bcrypt.hash('123456', saltRounds);

  const usersData = [
    // --- Passageiros ---
    {
      email: 'passageiro1@test.com',
      phone: '+5511900000001',
      firstName: 'Ana',
      lastName: 'Silva',
      gender: Gender.FEMALE,
      isPassenger: true,
    },
    {
      email: 'passageiro2@test.com',
      phone: '+5511900000002',
      firstName: 'Bruno',
      lastName: 'Costa',
      gender: Gender.MALE,
      isPassenger: true,
    },

    // --- Motoristas ---
    {
      email: 'motorista.aprovado@test.com',
      phone: '+5511900000003',
      firstName: 'Carlos',
      lastName: 'Pereira',
      gender: Gender.MALE,
      isDriver: true,
      driverStatus: Status.APPROVED,
    },
    {
      email: 'motorista.pendente@test.com',
      phone: '+5511900000004',
      firstName: 'Daniela',
      lastName: 'Alves',
      gender: Gender.FEMALE,
      isDriver: true,
      driverStatus: Status.PENDING,
    },
    {
      email: 'motorista.mulher@test.com',
      phone: '+5511900000005',
      firstName: 'Fernanda',
      lastName: 'Lima',
      gender: Gender.FEMALE,
      isDriver: true,
      driverStatus: Status.APPROVED,
    },
    {
      email: 'motorista.moto@test.com',
      phone: '+5511900000006',
      firstName: 'Gabriel',
      lastName: 'Rocha',
      gender: Gender.MALE,
      isDriver: true,
      driverStatus: Status.APPROVED,
    },
    {
      email: 'motorista.blindado@test.com',
      phone: '+5511900000007',
      firstName: 'Helena',
      lastName: 'Moraes',
      gender: Gender.FEMALE,
      isDriver: true,
      driverStatus: Status.APPROVED,
    },
  ];

  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        phone: userData.phone,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        password: defaultPassword,
      },
    });

    if (userData.isPassenger) {
      await prisma.passenger.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id },
      });
    }

    if (userData.isDriver) {
      await prisma.driver.upsert({
        where: { userId: user.id },
        update: { accountStatus: userData.driverStatus },
        create: {
          userId: user.id,
          licenseNumber: `LIC${user.phone.slice(-4)}`,
          licenseExpiryDate: new Date('2028-12-31'),
          accountStatus: userData.driverStatus,
        },
      });
    }
  }
  console.log('Users and profiles seeded successfully.');
}
