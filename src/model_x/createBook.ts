import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import BookServiceDynamo from "./services/books/BookServiceDynamo";
import BookService from "./services/books/BookService";

const createBookRequest = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100
                },
                author: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 200,
                }
            },
            required: ['title', 'author']
        }
    }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
    .use(jsonBodyParser())
    .use(validator({ eventSchema: transpileSchema(createBookRequest) }))
    .use(httpErrorHandler())
    .handler(async (event) => {

        if (event.body == null) {
            return {
                statusCode: 422,
                body: JSON.stringify({message: 'UNPROCESSABLE_ENTITY'})
            };
        }

        // @ts-ignore
        const { title, author } = event.body

        const bookService: BookService = new BookServiceDynamo()
        let bookCreated = await bookService
            .createBook(title, author)

        return {
            statusCode: 201,
            body: JSON.stringify(bookCreated)
        }

    })
