import { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    posts: [
      {
        id: 1,
        title: 'Título do post 1',
        body: 'Corpo do post com título 1',
      },
      {
        id: 2,
        title: 'Título do post 2',
        body: 'Corpo do post com título 2',
      },
      {
        id: 3,
        title: 'Título do post 3',
        body: 'Corpo do post com título 3',
      },
    ],
  }

  render() {
    const { posts } = this.state

    return (
      <div className="App">
        { posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        )) }
      </div>
    );
  }
}

export default App;
