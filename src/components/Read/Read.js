import React, { Component } from 'react'
import './read.css'
import icon from '../../images/books.png'

 class Read extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectValue : '',
            bookslist : this.props.ReadData,
            bookData : {} ,
            isMove : false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ bookslist: nextProps.ReadData });  
      }
    handleChange  =(e , item , k) => {
        let newbook = [...this.state.bookslist];
         newbook.splice(k,1)
        this.setState({
            bookslist : newbook
        })
        this.props.readBooks(item ,  e.target.value ,  newbook , 'Read')
            }
    render() {
        var ReadData = 
        this.state.bookslist.map((item , k)=> {
            return (
                <div key = {item.name} className = 'list-wrap'>
                     <div>
                            <img src = {icon}  className  = "image"/>
                        </div>
               <div><span>Title:  </span>{item.name}</div>
                    <div><span>Author:  </span>{item.author}</div>
                    <div><span>Category:  </span>{item.category}</div>
                    <select 
                         value={this.state.selectValue} 
                         onChange={e => this.handleChange(e , item , k)} 
                         className="ui dropdown">
                            <option value="Read">Read</option>
                            <option value="upcoming">To be Read</option>
                            <option value="current">Current</option>
                        </select>
                </div>
            )
        })
        return (
            <div className = 'wrapper'>
                <h1>Read </h1>
              <div className = "lists">{ReadData}</div>  
            </div>
        )
    }
}

export default Read;
