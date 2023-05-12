// import { Prisma, PrismaClient } from '@prisma/client';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
];

async function main() {
  console.log('Start seeding ...');
  await prisma.$connect();
  // console.log('prisma', prisma.user);
  // const allUsers = await prisma.user.findMany();
  // console.log('allUsers', allUsers);

  const user = await prisma.user.create({
    data: {
      name: 'Mahmoud222',
      email: 'mahmoud222@prisma.io',
    },
  });
  console.log('user', user);
  /* for (const u of userData) {
    const user = await prisma.User.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  } */
  console.log('Seeding finished.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
