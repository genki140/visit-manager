// apollo
import { useQuery, gql } from '@apollo/react-hooks';

const query = gql`
  query GetTasks {
    tasks {
      id
      title
    }
  }
`;

// interface Task {
//   id: string;
//   title: string;
// }

const Tasks: React.FC = () => {
  const { loading, data } = useQuery<{ tasks: any }>(query);

  console.log(data ?? '');

  return (
    <div>
      {loading ? <p>Loading ...</p> : <div>{data?.tasks?.length ?? ''}</div>}
    </div>
  );
};

export default Tasks;
