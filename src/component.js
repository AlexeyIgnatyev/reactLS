import React, { Component } from 'react';

import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdetedChange = this.handleUpdetedChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      name: '',
      color: '',
      list: JSON.parse(localStorage.getItem('list')) || [],
      showFlag: false,
      newName: '',
      newColor: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleUpdetedChange(event) {
      this.setState({[event.target.name]: event.target.value});
  }

  handleAdd() {
    let list = this.state.list;
    list.push({
      id: Date.now().toString(),
      name: this.state.name,
      color: this.state.color
    });
    localStorage.setItem('list', JSON.stringify(list));
    this.setState({
      name: '',
      color: '',
      list: list
    });
  }

  handleDelete(event) {
    event.preventDefault();
    let elemIdToDelete = event.target.parentNode.id;
    let list = this.state.list.filter(element =>
			element.id !== elemIdToDelete
		);
    this.setState({
      list: list,
      showFlag: false
    });
    localStorage.setItem('list', JSON.stringify(list));
  }

  toggleVisibility(event) {
    let list = this.state.list;
    let elemIdToUpdate = event.target.parentNode.id;
    let isElement = (item) => {
  		return item.id === elemIdToUpdate;
  	}
  	let element = list.find(isElement);
    this.setState({
      showFlag: true,
      currentItem: element,
      newName: element.name,
      newColor: element.color
    });
  }

  handleUpdate(event) {
    let currentItem = this.state.currentItem;
    currentItem.name = this.state.newName;
    currentItem.color = this.state.newColor;
    let list = this.state.list;
    this.setState({
      list: list,
      showFlag: false
    });
    localStorage.setItem('list', JSON.stringify(list));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="margin-top-md margin-left-md">
          <div className="row">
            <div className="col-md-3">
              <input type='text' className="form-control" placeholder='name' name='name' value={ this.state.name } onChange={ this.handleChange }/>
              <input type='text' className="form-control" placeholder='color' name='color' value={ this.state.color } onChange={ this.handleChange }/>
              <button className="btn btn-primary form-button" onClick={ this.handleAdd }>Add</button>
            </div>
            <div className="col-md-offset-1 col-md-3">
              { this.state.list.map((element, index) =>
                <div className="row listItem" key={ index } id={ element.id } onContextMenu={ this.handleDelete } onClick={ this.toggleVisibility }>
                  <div className="col-md-6">
                    { element.name }
                  </div>
                  <div className="col-md-6">
                    { element.color }
                  </div>
                </div>
              )}
            </div>
            <div className='col-md-offset-1 col-md-3'>
              { this.state.showFlag ?
                <div>
                  <input type='text' className="form-control" placeholder='new name' name='newName' value={ this.state.newName } onChange={ this.handleUpdetedChange }/>
                  <input type='text' className="form-control" placeholder='new color' name='newColor' value={ this.state.newColor } onChange={ this.handleUpdetedChange }/>
                  <button className="btn btn-primary form-button" onClick={ this.handleUpdate }>Update</button>
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
