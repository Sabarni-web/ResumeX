import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-background-light dark:bg-background-dark font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* We will add Navbar and Sidebar components here in Phase 2 */}
        <AppRoutes />
        
        {/* Toast Notifications Provider */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }} 
        />
      </div>
    </Router>
  )
}

export default App;
