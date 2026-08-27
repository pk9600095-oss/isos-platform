import IsosHero from './components/IsosHero';

function App() {
  return (
    <main className="bg-[#050810] min-h-screen">
      {/* 
        This renders the new Hero section at the very top.
        Once the scroll sequence finishes, users can scroll down normally. 
      */}
      <IsosHero />
      
      {/* The rest of your existing dashboard components or content goes below here */}
      <div className="relative z-50 bg-[#050810]">
         {/* ... (Paste your other existing components here if you had any) ... */}
      </div>
    </main>
  );
}

export default App;
