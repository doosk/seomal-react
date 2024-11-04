import { useState } from 'react';
import PropTypes from 'prop-types';

function Header({ title, onHeaderClick }) {
  return (
    <header>
      <h1>
        <a
          href='/'
          onClick={(e) => {
            e.preventDefault();
            onHeaderClick();
          }}
        >
          {title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  return (
    <nav>
      <ol>
        {props.topics.map((item) => (
          <li key={item.id}>
            <a
              id={item.id}
              href={`'/read/${item.id}'`}
              onClick={(e) => {
                e.preventDefault();
                props.onNavClick(e.target.id);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
// Nav.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   body: PropTypes.string.isRequired,
// };
function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ];
  const onClickHeader = () => setMode('WELCOME');

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB' />;
  } else if (mode === 'READ') {
    const { title, body } = topics.find((item) => item.id === id);
    content = <Article title={title} body={body} />;
  }
  return (
    <div>
      <Header title='REACT' onHeaderClick={onClickHeader} />
      <Nav
        topics={topics}
        onNavClick={(_id) => {
          setMode('READ');
          setId(Number(_id));
        }}
      />
      {content}
    </div>
  );
}

export default App;
