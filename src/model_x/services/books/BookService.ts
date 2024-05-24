import Book from "../../model/Book"

export default interface BookService {
    createBook(title: string, author: string): Promise<Book>
    deleteBook(id_book: string): void
    getBooks(): Promise<Book[]>
    getBook(id_book: string): Promise<Book>
    updateBook(id_book: string, title: string, author: string): void
}
