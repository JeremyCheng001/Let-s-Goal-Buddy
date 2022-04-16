import { ListTodosQuery, Todo } from "../API";
import { GraphQLResult } from "@aws-amplify/api";


function mapListTodosQuery(listTodosQuery: GraphQLResult<ListTodosQuery>): Todo[] {
  return listTodosQuery.data?.listTodos?.items?.map(todo => ({
    id: todo?.id,
    name: todo?.name,
    description: todo?.description
  } as Todo)) || []
}

export default Todo;
export { mapListTodosQuery as mapListTodos }