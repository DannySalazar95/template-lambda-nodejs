import {APIGatewayProxyHandler} from 'aws-lambda'
import BookServiceDynamo from "./services/books/BookServiceDynamo";
import BookService from "./services/books/BookService";

export const handler: APIGatewayProxyHandler = async (event) => {

    const bookService: BookService = new BookServiceDynamo()
    let response = await bookService.getBooks()

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}
