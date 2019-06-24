import React, { Component } from 'react'
import './upcoming.css'
import icon from '../../images/books.png'

 class upcoming extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectValue : '',
            bookslist : this.props.upcomingData,
            bookData : {} ,
            isMove : false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ bookslist: nextProps.upcomingData });  
      }
    handleChange  =(e , item , k) => {
      
        let newbook = [...this.state.bookslist];
         newbook.splice(k,1)
        this.setState({
            bookslist : newbook
        } , () => {
            console.log(this.state.bookslist)
        })
        this.props.upcomingbook(item ,  e.target.value ,  newbook , 'upcoming')
            }
  
    render() {
        var upcomingData = 
        this.state.bookslist.map((item,k) => {
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
                            <option value="upcoming">Tobe Read</option>
                            <option value="current">Current</option>
                            <option value="Read">Read</option>
                        </select>
                </div>
            )
        })
        return (
            <div className = 'wrapper'>
                <h1>To be Read </h1>
              <div className = "lists">{upcomingData}</div>  
  
            </div>
        )
    }
}
export default upcoming
