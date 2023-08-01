import { useQuery,gql, useMutation } from "@apollo/client"
import { ADD_BOOK, DELETE_BOOK, GET_BOOK, GET_BOOKS, UPDATE_BOOK } from "../constants/queryConstants"
import { mockData } from "../constants/mockData"


const GetBooks = gql`
  query GetBooks {
    books {
      id
      title
      author
      publicationYear
    }
  }
  `
  const GetBook = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publicationYear
    }
  }
`
const deleteBook = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`
const updateBook = gql`
  mutation UpdateBook($id: ID!, $title: String, $author: String, $publicationYear: Int) {
    updateBook(id: $id, title: $title, author: $author, publicationYear: $publicationYear) {
      id
      title
      author
      publicationYear
    }
  }
`
const addBook = gql`
  mutation createBook($title: String!, $author: String!, $publicationYear: Int!) {
    createBook(title: $title, author: $author, publicationYear: $publicationYear) {
      id
      title
      author
      publicationYear
    }
  }
`

export const useGQLQuery =(query,{variables}={})=>{
    const queryString = {
        [GET_BOOKS]: GetBooks,
        [GET_BOOK]: GetBook,
        [ADD_BOOK]: addBook,
        [DELETE_BOOK]: deleteBook,
        [UPDATE_BOOK]:updateBook,
        }[query]
        if (query === GET_BOOK || query === GET_BOOKS)
        {
            return useQuery(queryString||'')
        }
        return useMutation(queryString||'')

if (query==GET_BOOKS)
{
    return {
        data:mockData,
        loading:false,
        error:false
    }
}
if (query==GET_BOOK)
{
    const index = mockData.books.findIndex((book)=>book.id==variables?.id)
    return {

        data:mockData.books[index]||{},
        loading:false,
        error:false
    }
}
return { 
    data: {} ,
    loading:false,
    error:false
}

}