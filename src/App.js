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
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          props.onCreateSubmit(title, body);
        }}
      >
        <p>
          <input type='text' name='title' placeholder='title' />
        </p>
        <p>
          <textarea name='body' placeholder='body'></textarea>
        </p>
        <p>
          <input type='submit' value='Create' />
        </p>
      </form>
    </article>
  );
}
function Update({ topic, onUpdateSubmit }) {
  const [title, setTitle] = useState(topic.title);
  const [body, setBody] = useState(topic.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          onUpdateSubmit(topic.id, title, body);
        }}
      >
        <p>
          <input
            type='text'
            name='title'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p>
          <textarea
            name='body'
            placeholder='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </p>
        <p>
          <input type='submit' value='Update' />
        </p>
      </form>
    </article>
  );
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);
  const onClickHeader = () => setMode('WELCOME');

  let content = null;

  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB' />;
  } else if (mode === 'READ') {
    const { title, body } = topics.find((item) => item.id === id);
    content = <Article title={title} body={body} />;
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreateSubmit={(title, body) => {
          const { id: maxId } = topics.reduce((prev, curr) => {
            return prev.id >= curr.id ? prev : curr;
          }, 0);

          const topic = {};
          topic.id = maxId + 1;
          topic.title = title;
          topic.body = body;
          setTopics((curr) => [...curr, topic]);
          setMode('READ');
          setId(topic.id);
        }}
      />
    );
  } else if (mode === 'UPDATE') {
    content = (
      <Update
        topic={topics.find((item) => item.id === id)}
        onUpdateSubmit={(id, title, body) => {
          //const newTopics = topics.filter((item) => item.id !== id);
          const newTopics = topics.map((item) => {
            if (item.id === id) {
              item.title = title;
              item.body = body;
            }
            return item;
          });
          setTopics(newTopics);
          setMode('READ');
        }}
      />
    );
  }
  return (
    <div>
      <Header title='WEB' onHeaderClick={onClickHeader} />
      <Nav
        topics={topics}
        onNavClick={(_id) => {
          setMode('READ');
          setId(Number(_id));
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href='/create'
            onClick={(e) => {
              e.preventDefault();
              setMode('CREATE');
            }}
          >
            Create
          </a>
        </li>
        {mode === 'READ' && (
          <>
            <li>
              <a
                href={`'/update/${id}'`}
                onClick={(e) => {
                  e.preventDefault();
                  setMode('UPDATE');
                }}
              >
                Update
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  const newTopics = topics.filter((item) => item.id !== id);
                  setTopics(newTopics);
                  setMode('WELCOME');
                }}
              >
                Delete
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default App;
