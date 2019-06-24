import React, { Component } from 'react'
import './current.css'
import icon from '../../images/books.png'
class current extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectValue : '',
            bookslist : this.props.currData,
            bookData : {} ,
            isMove : false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ bookslist: nextProps.currData });  
      }
    handleChange  =(e , item , k) => {
      
let newbook = [...this.state.bookslist];
 newbook.splice(k,1)
this.setState({
    bookslist : newbook
})
this.props.action(item ,  e.target.value , newbook , 'current' )
    }
 
    render() {
        var currentData =
            this.state.bookslist.map((item , k) => {
                return (
                    <div key={item.name} className='list-wrap'>
                        <div>
                            <img src = {icon}  className  = "image"/>
                        </div>
                        <div><span>Title:  </span>{item.name}</div>
                        <div><span>Author:  </span>{item.author}</div>
                        <div><span>Category:  </span>{item.category}</div>
                        <div className = 'dropdown'>
                        <select 
                         onChange={e => this.handleChange(e , item , k)} 
                         className="ui dropdown">
                            <option value="current">Current</option>
                            <option value="upcoming">To be Read</option>
                            <option value="Read">Read</option>
                        </select>
                        </div>
                
                      
                    </div>
                )
            })
        return (
            <div className='wrapper'>
                <h1>Current  books</h1>
         { this.state.bookslist.length > 0  ?<div className="lists">{currentData}</div> : <div> No books to show </div>}
            </div>
        )
    }
}

export default current
