import React, { Component } from 'react'
 class search extends Component {

    handleChange = (e) => {
  this.props.searcher(e.target.value);
    }
    render() {
        return (
            <div>
            <input type = "text" onChange = {this.handleChange} />
            </div>
        )
    }
}

export default search
