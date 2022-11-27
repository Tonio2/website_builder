import React from 'react';
import {InsertTool, ToolBox} from './toolbox';


export class SimpleContainer extends React.Component {

  render() {
    const title = this.props.component.data.title
    const toolbox = this.props.edit && this.props.j_path !== '$' ?
      <ToolBox
        f={this.props.f}
        j_path={this.props.j_path}
        id={this.props.id}
      /> :
      null

    return (
      <div className="editable">
        <div className="SimpleContainer">
          {title ? <h2>{title}</h2> : null}
          <List
            components={this.props.component.data.children}
            j_path={this.props.j_path}
            f={this.props.f}
            edit={this.props.edit}
          />
        </div>
        {toolbox}
      </div>
    )
  }
}

export const Image = (props) => {
  const src = props.component.data.src
  const toolbox = props.edit ?
    <ToolBox
      f={props.f}
      j_path={props.j_path}
      id={props.id}
    /> :
    null
  return (
    <div className='editable'>
      <img src={`../${src}`} alt='...' />
      {toolbox}
    </div>
  )
}

const bloc = {
  SimpleContainer: SimpleContainer,
  Image: Image
}


export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }

  expand = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render() {
    return (
      <div>
        {
          this.props.edit ?
          <InsertTool f={this.props.f} j_path={this.props.j_path} /> :
          null
        }
        {this.props.components?.map((component, id) => {
          return (
            React.createElement(bloc[component.name], {
              key: id,
              component: component,
              f: this.props.f,
              j_path: this.props.j_path + '.data.children[' + id + ']',
              id: id,
              edit: this.props.edit
            })
          )
        })}
      </div>
    )
  }
}

