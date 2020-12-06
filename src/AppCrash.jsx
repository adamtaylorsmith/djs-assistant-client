import React, {Component} from 'react';

class App extends Component {

    state = {
        todos: [
            {
                id: 1,
                title: 'do stuff'
            },
            {
                id: 2,
                title: 'do junk'
            }
        ]
    }

    render() {
        console.log(this.state.todos)
        return (
            <div>
                <Todos todos={this.state.todos} />
            </div>
        )
    }
}

export default App;

// *****************************************************************************************************

class Todo extends Component {

    render() {
        return this.props.todos.map((todo) => (
            <h1>{todo.title}</h1>
        ))
        
    }
}
import React, { Component } from 'react'

 


