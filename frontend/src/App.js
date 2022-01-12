import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ResumeList from "./components/ResumeList"
import Resume from "./components/Resume"
import AddResume from "./components/AddResume"
// import EditResume from "./components/EditResume"

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><b>Critiqr</b></a>
              <div className="d-flex">
                <Link to={"/create"}>
                  <button type="button" className="btn btn-success btn-sm"><b>+ CREATE POST</b></button>
                </Link>
              </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<ResumeList/>} />
          <Route path="/create" element={<AddResume/>} />
          <Route path="/resumes/:id" element={<Resume/>} />
          {/* <Route path="/resumes/:id/edit" element={<EditResume />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
