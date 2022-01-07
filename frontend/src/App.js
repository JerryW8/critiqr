import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ResumeList from "./components/ResumeList"
// import Resume from "./components/Resume"
// import AddResume from "./components/AddResume"

function App() {
  return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><b>Critiqr</b></a>
            <Router>
              <div className="d-flex">
                <Link to={"/resume/:id/review"}>
                  <button type="button" className="btn btn-success btn-sm"><b>+ CREATE POST</b></button>
                </Link>
              </div>
              <Routes>
                {/* <Route exact path="/" component={<ResumeList/>} /> */}
                {/* <Route 
                  path="/resumes/:id/review"
                  render={(props) => <AddResume {...props} />}
                />
                <Route
                  path="/resumes/:id"
                  render={(props) => <Resume {...props} /> }
                /> */}
              </Routes>
            </Router>
          </div>
        </nav>
        <div>
          <ResumeList />
        </div>
      </div>
  );
}

export default App;
