import {gql} from "@apollo/client";

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const ADD_TASK = gql`
mutation AddTask($text: String!) {
    addTask(text: $text) {
        text
    }
}`;

export const UPDATE_TASK = gql`
mutation UpdateTask($id: ID!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
        id
        completed
    }
}`;
