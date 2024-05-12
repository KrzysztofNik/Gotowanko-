import './App.css';
import CpmTable from "./components/CpmTable";
import Header from "./components/Header";
import CpmDescription from "./components/CpmDescription";

function App() {
  return (
    <div className='flex justify-center h-[140vh] pt-10'>
      <header>
      </header>
        <main>
            <Header />
            <CpmDescription />
            <CpmTable />
        </main>
    </div>
  );
}

export default App;
