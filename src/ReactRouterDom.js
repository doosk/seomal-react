import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
// import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './navlink.css';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}
function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      Topics...
    </div>
  );
}
function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}
function ReactRouterDom() {
  return (
    <div>
      <h1>React Router DOM example</h1>
      <Router basename={process.env.PUBLIC_URL}>
        <ul>
          <li>
            <NavLink exact to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/topics'>Topics</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
        </ul>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/topics' element={<Topics />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<h2>Not found</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default ReactRouterDom;
