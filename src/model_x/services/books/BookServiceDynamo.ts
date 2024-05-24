import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import {randomUUID} from 'crypto'
import Book from '../../model/Book';
import BookService from "./BookService";
import {dynamoDBConnectionClient} from "../db/DBConnection"

export default class BookServiceDynamo implements BookService {

    private bookTable: string = 'books';
    private ddbDocClient: DynamoDBDocumentClient;

    constructor() {
        this.ddbDocClient = dynamoDBConnectionClient()
    }

    async createBook(title: string, author: string): Promise<Book> {

        let bookToCreated = {
            id: randomUUID(),
            title,
            author,
            createdAt: new Date().toISOString()
        }

        await this.ddbDocClient.send(new PutCommand({
            TableName: this.bookTable,
            Item: bookToCreated
        }))

        return new Book(
            bookToCreated.id,
            bookToCreated.title,
            bookToCreated.author,
            bookToCreated.createdAt)
    }
    async deleteBook(id_book: string) {
        await this.ddbDocClient.send(new DeleteCommand({
            TableName: this.bookTable,
            Key: { id: id_book }
        }));
    }
    async getBooks(): Promise<Book[]> {
        let response = await this.ddbDocClient.send(
            new ScanCommand({TableName: this.bookTable}))

        return response.Items.map(element => {
            return new Book(element.id, element.title, element.author, element.createdAt)
        });
    }
    async getBook(id_book: string): Promise<Book> {
        let response = await this.ddbDocClient.send(new GetCommand({
            TableName: this.bookTable,
            Key: { id: id_book }
        }))

        return new Book(
            response.Item?.id,
            response.Item?.title,
            response.Item?.description,
            response.Item?.createdAt)
    }
    async updateBook(id_book: string, title: string, author: string) {
        await this.ddbDocClient.send(
            new UpdateCommand({
                TableName: this.bookTable,
                Key: { id: id_book },
                UpdateExpression: "set title = :title, author = :author",
                ExpressionAttributeValues: {
                    ":title": title,
                    ":author": author
                },
                ReturnValues: 'ALL_NEW'
            }))
    }
}
