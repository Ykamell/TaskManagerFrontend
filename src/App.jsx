import Tasks from './Tasks'
import { TaskProvider } from './context/TaskContext';
import './App.css'

function App() {

  return (
    <TaskProvider>
      <Tasks/>
    </TaskProvider>
  )
}

export default App
