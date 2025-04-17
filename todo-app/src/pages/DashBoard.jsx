const Dashboard = () => {
    const { user } = useAuth();
    const [todos, setTodos] = useState([]);
    const [viewAll, setViewAll] = useState(false);
  
    useEffect(() => {
      const fetchTodos = async () => {
        const res = await axios.get(`/api/todos`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTodos(res.data);
      };
      fetchTodos();
    }, [user]);
  
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Todo Dashboard</h1>
        {user.role === 'admin' && (
          <button onClick={() => setViewAll(!viewAll)} className="mb-4">
            {viewAll ? 'View My Todos' : 'View All Todos'}
          </button>
        )}
        {todos.map(todo => (
          <TodoCard key={todo._id} todo={todo} />
        ))}
      </div>
    );
  };