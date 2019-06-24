import React, { Component } from 'react';
import './dashboard.css'
import Current from '../current/current';
import Upcoming from  '../upcoming/upcoming';
import Read from '../Read/Read';
import Search from '../search/search'
import icon from '../../images/books.png'

class dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            booksData : {
                currentBooks : [{name : 'The 5AM club' , author: 'Robin Sharma',category:'fantasy'},{name : 'Rich dad poor dad' , author : 'Robert Kiyosaki' , category : 'finance'} ],
                toBeRead : [{name : 'The power of your subConcious Mind' , author : 'Joseph Murphy',category:'sci-fi'} , {name : 'Indian Polity' , author :'M Laxminath',category:'fantasy'}],
                Read : [ {name: 'COncepts of Physics' , author : 'HC Verma',category:'sci-fi' } ,{name: 'The secrets we keep' , author : 'Nagarakar Sudeep',category:'thriller'}]
            } ,
             fullArray : [] , 
             keyword : '',
             searchArr : [],
             bookType : []
        }
    }
    componentDidMount () {
        const fullArr = this.state.booksData.currentBooks.concat(this.state.booksData.toBeRead).concat(this.state.booksData.Read);
        this.setState({
            fullArray : fullArr
        })

      
        let category = [...new Set( fullArr.map(item => {
            return(item.category)
        }))];
        this.setState ({
            bookType : category
        })
        console.log(category)
    }
    handleSearch = (searched ) => {
        if(searched === '') {
            this.setState({
                keyword : ''
            })
        }
    
        var filter = "category";
        // var keyword = searched;
        
        var filteredData = this.state.fullArray.filter(function(obj) {
            return obj[filter].search(searched)!== -1
        });
        this.setState({
            searchArr : filteredData ,
            keyword : searched
        })
          console.log(filteredData)
    }

    handleChange = (value , type , updatedData , source ) => {
    let newArr = [];
    switch(type) {
        case 'upcoming':
            newArr = [...this.state.booksData.toBeRead]
            newArr.push(value);
            this.setState(prevState => ({
                booksData: {                   // object that we want to update
                    ...prevState.booksData,    // keep all other key-value pairs
                    toBeRead: newArr       // update the value of specific key
                }
            }),() => {
                console.log(this.state.booksData)
            })
            break

            case 'Read':
            newArr = [...this.state.booksData.Read]
            newArr.push(value)
            this.setState(prevState => ({
                booksData: {                   // object that we want to update
                    ...prevState.booksData,    // keep all other key-value pairs
                    Read: newArr       // update the value of specific key
                }
            }))
            break

            case 'current':
            newArr = [...this.state.booksData.currentBooks]
            newArr.push(value);
            this.setState(prevState => ({
                booksData: {                   // object that we want to update
                    ...prevState.booksData,    // keep all other key-value pairs
                    currentBooks: newArr       // update the value of specific key
                }
            }))
            break
    }
    if(source === 'current') {
        this.setState(prevState => ({
            booksData: {                   // object that we want to update
                ...prevState.booksData,    // keep all other key-value pairs
                currentBooks: updatedData       // update the value of specific key
            }
        }))
    } else if (source === 'upcoming') {
        this.setState(prevState => ({
            booksData: {                   // object that we want to update
                ...prevState.booksData,    // keep all other key-value pairs
                toBeRead: updatedData       // update the value of specific key
            }
        }))
    } else {
        this.setState(prevState => ({
            booksData: {                   // object that we want to update
                ...prevState.booksData,    // keep all other key-value pairs
                Read: updatedData       // update the value of specific key
            }
        }))

    }
}
  
    render() {
        var searchData = this.state.searchArr.map((item,index) =>{
            return (
                <div key={item.name} className='list-wrap'>
                <div>
                    <img src = {icon}  className  = "image"/>
                </div>
                <div><span>Title:  </span>{item.name}</div>
                <div><span>Author:  </span>{item.author}</div>
                <div><span>Category:  </span>{item.category}</div>
        
              
            </div>
            )
        })
        return (
            <div className = 'dashWrap'>
                <Search  searcher = {this.handleSearch} />
                {this.state.keyword.length > 0 ? searchData: <div>
                    <Current  currData = {this.state.booksData.currentBooks}  action = {this.handleChange}/>
            <Upcoming  upcomingData = {this.state.booksData.toBeRead} upcomingbook = {this.handleChange}/>
            <Read  ReadData = {this.state.booksData.Read} readBooks = {this.handleChange}/>
                </div>}
         
            </div>
        )
    }
}
export default dashboard