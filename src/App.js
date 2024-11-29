import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark
                      text-text-light dark:text-text-dark transition-colors">
        <nav className="p-4 bg-surface-light dark:bg-surface-dark">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">VideoCast</h1>
            <ThemeToggle />
          </div>
        </nav>
        
        <main className="container mx-auto p-4">
          {/* Diğer komponentler buraya gelecek */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;