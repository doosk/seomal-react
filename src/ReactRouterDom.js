import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
} from 'react-router-dom';
// import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './navlink.css';

const contents = [
  { id: 1, title: 'HTML', desc: 'HTML is ...' },
  { id: 2, title: 'JS', desc: 'JS is ...' },
  { id: 3, title: 'React', desc: 'React is ...' },
];

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}
function Topic() {
  const { id } = useParams();
  let selected_topic = contents.find((item) => item.id === Number(id));
  if (!selected_topic)
    selected_topic = {
      title: 'Sorry',
      desc: 'Not found',
    };

  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.desc}
    </div>
  );
}
function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {contents.map((topic) => (
          <li key={topic.id}>
            <NavLink to={'/topics/' + topic.id}>{topic.title}</NavLink>
          </li>
        ))}
      </ul>
      {/* 부모 Route의 path 뒤에 /*(와일드카드)를 붙이는 방법 (/*) */}
      {/* <Routes>
        <Route path=':id' element={<Topic />} />
      </Routes> */}
      <Outlet />
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
            <NavLink to='/'>Home</NavLink>
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
          {/* <Route path='/topics/*' element={<Topics />} /> */}
          {/* 부모 Route로 자식 Route를 감싸는 방법m(Wrapping) */}
          {/* 자식 Route를 렌더링할 위치를 <Outlet />으로 표시한다 */}
          <Route path='/topics/*' element={<Topics />}>
            <Route path=':id' element={<Topic />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<h2>Not found</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default ReactRouterDom;
