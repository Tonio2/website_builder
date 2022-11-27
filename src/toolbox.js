import React from 'react';

export function gen(name, key, value) {
  const data = {
    name: name,
  }
  const param = {}
  param[key] = value
  data.data = param
  return data
}

export class InsertTool extends React.Component {
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
    let form_edit = null
    if (this.state.isVisible) {
      form_edit = <ComponentForm f={this.props.f} j_path={this.props.j_path} expand={this.expand} type='insert' />
    }

    return (
      <div className='toolbox'>
        <button onClick={this.expand}>+</button>
        {form_edit}
      </div>
    )
  }
}


export class ToolBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: [false, false]
    }
  }

  expand = (i) => {
    const isVisible = this.state.isVisible.slice()
    isVisible[i] = !isVisible[i]
    this.setState({isVisible: isVisible})
  }

  render() {
    const props_add = {
      f: this.props.f,
      j_path: this.props.j_path,
      expand: () => this.expand(0),
      type: 'add',
      id: this.props.id
    }
    const form_add = this.state.isVisible[0] ? <ComponentForm {...props_add} /> : null

    const props_edit = {
      f: this.props.f,
      j_path:this.props.j_path,
      expand: () => this.expand(1),
      type:'edit'
    }
    const form_edit = this.state.isVisible[1] ? <ComponentForm {...props_edit} /> : null

    return (
      <div className='toolbox'>
        <div>
          <button onClick={() => this.expand(0)}>+</button>
          <button onClick={() => this.expand(1)}>E</button>
          <button onClick={() => this.props.f.del(this.props.j_path, this.props.id)}>-</button>
        </div>
        {form_add}
        {form_edit}
      </div>
    )
  }
}

export class ComponentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'SimpleContainer',
      key: 'title',
      value: 'hey'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const component = gen(this.state.name, this.state.key, this.state.value)
    if (this.props.type === 'insert')
      this.props.f.insert(this.props.j_path, component)
    else if (this.props.type === 'add')
      this.props.f.add(this.props.j_path, this.props.id + 1, component)
    else if (this.props.type === 'edit')
      this.props.f.edit(this.props.j_path, component)
    this.props.expand()
    event.preventDefault()
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <select name='name' value={this.state.name} onChange={this.handleChange}>
            <option value='SimpleContainer'>SimpleContainer</option>
            <option value='Image'>Image</option>
          </select>
        </label>
        <br />
        <label>
          Attribute:
          <select value={this.state.key} onChange={this.handleChange} name='key' >
            <option value='title'>title</option>
            <option value='src'>src</option>
          </select>
        </label>
        <label>
          :
          <input type="text" value={this.state.value} onChange={this.handleChange} name='value' />
        </label>
        <br />
        <input type='submit' value={this.props.type} />
      </form>
    )
  }
}

