import { useState, useEffect } from 'react';
import './App.css';
import Services from './Components/Services';
import ThreeModel from './Components/ThreeModel';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timer to hide the spinner after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Show ThreeModel spinner for 2 seconds, then show Services */}
      {loading ? <ThreeModel /> : <Services />}
    </div>
  );
}

export default App;
