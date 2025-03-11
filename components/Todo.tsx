import React, { useState, useEffect } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  labels: string[];
  dueDate?: Date;
  recurring: 'none' | 'daily' | 'weekly' | 'monthly';
  progress: number;
  lastCompleted?: Date;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [labels, setLabels] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [recurring, setRecurring] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');

  const categories = ['personal', 'work', 'shopping', 'health', 'urgent'];
  const availableLabels = ['important', 'quick', 'long-term', 'meeting', 'followup'];

  useEffect(() => {
    const interval = setInterval(handleRecurringTasks, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [todos]);

  const handleRecurringTasks = () => {
    const today = new Date();
    todos.forEach(todo => {
      if (todo.recurring !== 'none' && todo.lastCompleted) {
        let shouldReset = false;
        const daysSinceCompletion = Math.floor((today.getTime() - todo.lastCompleted.getTime()) / (1000 * 60 * 60 * 24));

        switch (todo.recurring) {
          case 'daily': shouldReset = daysSinceCompletion >= 1; break;
          case 'weekly': shouldReset = daysSinceCompletion >= 7; break;
          case 'monthly': shouldReset = daysSinceCompletion >= 30; break;
        }

        if (shouldReset) {
          setTodos(prevTodos =>
            prevTodos.map(t =>
              t.id === todo.id ? { ...t, completed: false, progress: 0, lastCompleted: undefined } : t
            )
          );
        }
      }
    });
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputText,
        completed: false,
        category,
        priority,
        labels,
        dueDate,
        recurring,
        progress: 0,
        lastCompleted: undefined
      };
      setTodos([...todos, newTodo]);
      setInputText('');
      setLabels([]);
      setDueDate(undefined);
      setRecurring('none');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              progress: !todo.completed ? 100 : 0,
              lastCompleted: !todo.completed ? new Date() : undefined
            }
          : todo
      )
    );
  };

  const updateProgress = (id: number, progress: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, progress: Math.min(100, Math.max(0, progress)) } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          ✨ Enhanced Todo List
        </h1>
        
        <form onSubmit={handleAddTodo} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-inner">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="✍️ Add a new task..."
              className="col-span-full p-4 border-2 border-indigo-100 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent text-lg transition-all duration-200 hover:border-purple-200"
            />
            
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-4 border-2 border-indigo-100 rounded-xl shadow-sm hover:border-purple-200 transition-all duration-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>📑 {cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="p-4 border-2 border-indigo-100 rounded-xl shadow-sm hover:border-purple-200 transition-all duration-200"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            
            <select
              value={recurring}
              onChange={(e) => setRecurring(e.target.value as 'none' | 'daily' | 'weekly' | 'monthly')}
              className="p-4 border-2 border-indigo-100 rounded-xl shadow-sm hover:border-purple-200 transition-all duration-200"
            >
              <option value="none">📅 No Repeat</option>
              <option value="daily">🔄 Daily</option>
              <option value="weekly">📅 Weekly</option>
              <option value="monthly">📆 Monthly</option>
            </select>
            
            <input
              type="date"
              onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)}
              className="p-4 border-2 border-indigo-100 rounded-xl shadow-sm hover:border-purple-200 transition-all duration-200"
            />
            
            <select
              multiple
              value={labels}
              onChange={(e) => setLabels(Array.from(e.target.selectedOptions, option => option.value))}
              className="p-4 border-2 border-indigo-100 rounded-xl shadow-sm hover:border-purple-200 transition-all duration-200"
            >
              {availableLabels.map(label => (
                <option key={label} value={label}>🏷️ {label.charAt(0).toUpperCase() + label.slice(1)}</option>
              ))}
            </select>
            
            <button 
              type="submit"
              className="col-span-full p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 transform"
            >
              ✨ Add Task
            </button>
          </div>
        </form>

        <ul className="space-y-6">
          {todos.map((todo) => (
            <li 
              key={todo.id}
              className={`p-6 rounded-xl shadow-md border-l-8 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                todo.priority === 'high' 
                  ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-white' 
                  : todo.priority === 'medium'
                  ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-white'
                  : 'border-green-500 bg-gradient-to-r from-green-50 to-white'
              }`}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-6 w-6 rounded-lg border-2 text-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200 cursor-pointer"
                  />
                  <div className="flex flex-col gap-2">
                    <span className={`text-xl ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                      {todo.text}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        📑 {todo.category}
                      </span>
                      {todo.labels.map(label => (
                        <span key={label} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          🏷️ {label}
                        </span>
                      ))}
                      {todo.recurring !== 'none' && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          🔄 {todo.recurring}
                        </span>
                      )}
                      {todo.dueDate && (
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                          ⏰ Due: {todo.dueDate.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-40">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
                        style={{ width: `${todo.progress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={todo.progress}
                      onChange={(e) => updateProgress(todo.id, parseInt(e.target.value))}
                      className="w-full mt-2 accent-purple-500"
                    />
                    <div className="text-center text-sm font-medium text-purple-600">
                      {todo.progress}%
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-3 text-pink-500 hover:text-pink-700 hover:bg-pink-50 rounded-full transition-all duration-200"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;