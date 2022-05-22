import { formatDate } from '../utils/authUtils';

export const users = [
  {
    _id: '0',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU',
    name: 'guest',
    password: 'guest777',
    email: 'guest@gmail.com',
    createdAt: formatDate(),
    notes: [],
    archives: [],
    trash: [],
    updatedAt: formatDate(),
  },
];
