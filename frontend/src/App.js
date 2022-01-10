import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage"
import NotePage from "./pages/NotePage";
import {useState} from "react";
import LoadingBar from "react-top-loading-bar";


function App() {

    const [notes, setNotes] = useState([])
    const [progress, setProgress] = useState(0)

    const getNotes = async () => {
        setProgress(20)
        let response = await fetch("/api/notes/")
        setProgress(40)
        let data = await response.json()
        setProgress(100)
        setNotes(data)
    }

    return (
      <BrowserRouter>
        <div className='container dark'>
            <div className="app">
                <Header />
                <div>
                    <LoadingBar color='#f11946' progress={progress}/>
                </div>
                <Routes>
                    <Route exact path="/" element={<NotesListPage notes={notes} getNotes={getNotes} />} />
                    <Route path="/note/:id" element={<NotePage getNotes={getNotes} setProgress={setProgress} />} />
                </Routes>
            </div>
        </div>
      </BrowserRouter>
    );
}

export default App;
