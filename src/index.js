import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {SimpleContainer} from './components';
var jp = require('jsonpath')

class Builder extends React.Component {
  constructor() {
    super()
    this.state = {
      edit: true,
      name : 'root',
      data: {
        title: 'Root'
      }
    }
  }

  functions  = {

    insert: (j_path, value) => {
      const root = {...this.state}
      const component = jp.value(root, j_path)
      component.data.children = component.data.children || []
      component.data.children.splice(0,0, value)
      this.setState(root)
    },

    add: (j_path, idx, value) => {
      const root = {...this.state}
      const component = jp.parent(root, j_path)
      component.splice(idx, 0, value)
      this.setState(root)
    },

    edit: (j_path, newValue) => {
      const root = {...this.state}
      jp.value(root, j_path, newValue)
      this.setState(root)
    },

    del: (j_path, idx) => {
      const root = {...this.state}
      jp.parent(root, j_path).splice(idx, 1)
      this.setState(root)
    }
  }

  switchMode = () => {
    const root = {...this.state}
    root.edit = !root.edit
    this.setState(root)
    console.log('hey')
  }

  render() {
    return (
      <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav.Link href="#">Webstite builder</Nav.Link>
          <Button onClick={this.switchMode}>Edit Mode</Button>
        </Container>
      </Navbar>
      <SimpleContainer
        component={this.state}
        f={this.functions}
        j_path='$'
        edit={this.state.edit}
      />
      </>
    )
  }

}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Builder />);
