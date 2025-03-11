export const styles = {
  pageBackground: "min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 lg:p-10",
  containerStyle: "max-w-4xl mx-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl p-6 sm:p-8 border border-white/20",
  headerStyle: "text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-transparent bg-clip-text drop-shadow-sm",
  inputBase: "p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition-all bg-white/80",
  button: "bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all font-medium text-lg",
  labelContainer: "p-6 bg-white/50 rounded-xl shadow-inner",
  labelButton: "flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow transition-all cursor-pointer border border-gray-100",
  todoItem: "flex items-center justify-between p-6 border rounded-xl shadow-md hover:shadow-lg transition-all",
  progressBar: "w-full bg-gray-200 rounded-full h-2",
  progressFill: "bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
};

export const getPriorityGradient = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-gradient-to-r from-red-100 to-red-50 border-red-200 shadow-red-100';
    case 'medium': return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200 shadow-yellow-100';
    case 'low': return 'bg-gradient-to-r from-green-100 to-green-50 border-green-200 shadow-green-100';
    default: return '';
  }
}; 