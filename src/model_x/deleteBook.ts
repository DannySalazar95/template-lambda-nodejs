import {APIGatewayProxyHandler} from 'aws-lambda'
import BookServiceDynamo from "./services/books/BookServiceDynamo";
import BookService from "./services/books/BookService";

export const handler: APIGatewayProxyHandler = async (event) => {

    const { pathParameters } = event;

    if (pathParameters == null) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'BAD_REQUEST'})
        };
    }

    const { id_book } = pathParameters;

    if (typeof id_book == 'undefined') {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'BAD_REQUEST'})
        };
    }

    const bookService: BookService = new BookServiceDynamo()
    bookService.deleteBook(id_book)

    return {
        statusCode: 200,
        body: "Book deleted"
    }
}
