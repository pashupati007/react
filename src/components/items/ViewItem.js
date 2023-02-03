{/* import axios from 'axios';
import React, { Component } from 'react'
import { FaTrashAlt, FaPencilAlt, FaTruckLoading } from 'react-icons/fa';
import { json, Link } from 'react-router-dom';
import { errorHandler } from '../../service/error.service';
import { getAuthenticationToken } from '../../utils';
import { formatDate } from '../../utils/dateUtil';
import { httpClient } from '../../utils/httpClient';
import { notify } from '../../utils/notify';

const IMG_URL = process.env.REACT_APP_IMG_URL;

export default class ViewItem extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            isLoading: false,
        }
    }
    
    async componentDidMount() {
        console.log('this.props', this.props)
        console.log('this.state', this.state.items)
        this.setState({
            isLoaing: true
        })
        console.log('this.state', this.state.isLoading)
        try {
            let { data } = await httpClient.GET('/product', true)
            console.log('data in view data are',data)
            this.setState({
                items: data
            })
            
        } catch (err) {
            errorHandler(err)
        }
        finally {
            this.setState({
                isLoading: false
            })
        }
    }
    editItem = id => {

    }

    // TRY remove ko cycle from redux
    removeItem = (id, index) => {
        let confirmatioin = window.confirm('Are you sure to remove?')
        if (confirmatioin) {
            httpClient.DELETE(`/item/${id}`, true)
                .then(response => {
                    notify.showSuccess('Item Removed')
                    const { items } = this.state;
                    items.splice(index, 1)

                    this.setState({
                        items: items
                    })
                })
                .catch(err => {
                    errorHandler(err)
                })
        }
    }

    render() {
        let content = this.props.isLoaing
            ? <h1> Loading...</h1>
            : <div>
                <h2>View Items</h2>
                {this.props.searchResults && this.props.searchResults.length > 0 && (
                    <button className='btn btn-success' onClick={() => this.props.resetSearch()}>Search Again</button>
                )}
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>created At</th>
                            <th>Tags</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.props.items || []).map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link to={`/item_details/${item._id}`}>{item.name}</Link></td>
                                <td>{item.category}call</td>
                                <td>{item.price}102934890</td>
                                <td>{item.brand}</td>
                                <td>{formatDate(item.createdAt)}</td>
                                <td>{item.tags.join(',')}</td>
                                <td>
                                    <img src={`${IMG_URL}/${item.images[0]}`} alt="itemImage.png" width="150px"></img>
                                </td>
                                {/* <td>
                                    <Link to={`/edit_item/${item._id}`}>
                                        <FaPencilAlt onClick={() => this.editItem(item._id)} title="Edit" color="blue" ></FaPencilAlt>
                                    </Link>
                                    <FaTrashAlt onClick={() => this.remvoeItem(item._id, index)} title="Remove" color="red" ></FaTrashAlt>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        return (
            content
        )
    }
}
 */}