import { setIn } from './setIn';

interface Library {
  name: string;
  address: string;
  books: {
    [isbn: string]: {
      title: string;
      author: string;
      publishYear: number;
      available: boolean;
    };
  };
  members: {
    [id: string]: {
      name: string;
      email: string;
      borrowedBooks: string[];
    };
  };
}

// 초기 도서관 데이터
const library: Library = {
  name: 'Central City Library',
  address: '123 Main St, Central City',
  books: {
    '978-1234567890': {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishYear: 1925,
      available: true,
    },
  },
  members: {
    M001: {
      name: 'John Doe',
      email: 'john@example.com',
      borrowedBooks: [],
    },
  },
};

// 1. 새 책 추가
const updatedLibrary1 = setIn(library, ['books', '978-0987654321'], {
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  publishYear: 1960,
  available: true,
});

console.log(updatedLibrary1.books['978-0987654321']);

// 2. 회원의 이메일 주소 변경
const updatedLibrary2 = setIn(
  updatedLibrary1,
  ['members', 'M001', 'email'],
  'johndoe@newemail.com'
);

console.log(updatedLibrary2.members['M001'].email);

// 3. 책의 대출 상태 변경 및 회원의 대출 목록 업데이트
const updatedLibrary3 = setIn(updatedLibrary2, ['books', '978-1234567890', 'available'], false);
const updatedLibrary4 = setIn(
  updatedLibrary3,
  ['members', 'M001', 'borrowedBooks'],
  [...updatedLibrary3.members['M001'].borrowedBooks, '978-1234567890']
);

console.log(updatedLibrary4.books['978-1234567890'].available);
console.log(updatedLibrary4.members['M001'].borrowedBooks);

// 원본 데이터는 변경되지 않았음을 확인
console.log(library.books['978-1234567890'].available);
console.log(library.members['M001'].borrowedBooks);
