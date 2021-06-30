import bcryptjs from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@examples.com',
    password: bcryptjs.hashSync('123456', 10),
    phone: '074893923',
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@examples.com',
    phone: '074893922',
    password: bcryptjs.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@examples.com',
    phone: '07489482',
    password: bcryptjs.hashSync('123456', 10),
  }
];

export default users;