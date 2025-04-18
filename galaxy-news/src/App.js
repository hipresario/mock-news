import logo from './logo.svg';
import './App.css';

import { NewsProvider } from './context/NewsContext';
import NewsFeed from './components/NewsFeed';

function App() {
  return (
    <div className="App">
      <main>
       <NewsProvider>
          <NewsFeed />
        </NewsProvider>
      </main>
    </div>
  );
}

export default App;
