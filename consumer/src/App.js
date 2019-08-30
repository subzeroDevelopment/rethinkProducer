import React from 'react';
import './App.css';
import io from  "socket.io-client"



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
  }
  getData(){
    const socket = io('http://localhost:3001');
    socket.on('some',(msg)=>{
      console.log("MSG: ",msg)
      this.setState({
        value:msg.new_val.msg
      })
    })  
  
  }
  componentDidMount(){
    this.getData()
  }
  onChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div>
        <h1>Hello React ES6 Class Component!</h1>
        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default App;
