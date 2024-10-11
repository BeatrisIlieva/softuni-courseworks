from typing import List, Dict
from project.user import User


class Library:
    def __init__(self):
        self.user_records: List[User] = []
        self.books_available: Dict[str: [str]] = {}  # {author_name: [book1, book2...]}
        self.rented_books: Dict[str: {str: int}] = {}  # {user_name : {book_name: days_left}}

    def get_book(self, author: str, book_name: str, days_to_return: int, user: User) -> str:
        if author in self.books_available:
            if book_name not in self.books_available[author]:

                for data in self.rented_books.values():
                    if book_name in data:
                        days = data[book_name]

                        return f'The book "{book_name}" is already rented and will be available in {days} days!'

            self.books_available[author].remove(book_name)

            if self.rented_books[user.username]:
                self.rented_books[user.username][book_name] = days_to_return
            else:
                self.rented_books.update({user.username: {book_name: days_to_return}})

            user.books.append(book_name)

            return f"{book_name} successfully rented for the next {days_to_return} days!"


    def return_book(self, author:str, book_name:str, user: User):
        if book_name not in user.books:
            return f"{user.username} doesn't have this book in his/her records!"

        user.books.remove(book_name)

        self.books_available[author].append(book_name)

        del self.rented_books[user.username][book_name]