import React, { Component } from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';

class SearchBody extends Component{
    state = {
        isLoading: true,
        groups: [],
        param: "",
        curPage: "",
        sort: "search/"
    };

    async componentDidMount() {
        const search = this.props.match.params.search;

        const response = await fetch('/api/search/' + search +'?page='+(this.props.match.params.page-1));
        const body = await response.json();
        const page = (this.props.match.params.page);
        this.setState({groups: body, isLoading: false, param: search, curPage: page})
    }

    render() {
        const {groups, isLoading, param, curPage, sort} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }
        return (
            groups.content.map(group =>
                <div className="col-md-6 col-lg-4 filtr-item" data-category="1,2,3">
                    <div className="bg-light border rounded shadow card" style={{minHeight:'350px'}} data-bs-hover-animate="pulse"><Link
                        to={"/jejumaru/detail/pno/" + group.pno + "/page/1"} ><img className="card-img-top" src={group.pthumb}/></Link>
                        <Link to={"/jejumaru/detail/pno/" + group.pno + "/page/1"}><div className="card-body"
                                                                               style={{cursor: 'pointer'}}>
                            <h3 className="card-title" style={{
                                fontFamily: 'Antic, sans-serif',
                                color: 'rgb(81,87,94)',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>{group.ptitle}</h3>
                            <h5 className="card-sub-title" style={{
                                fontFamily: 'Antic, sans-serif',
                                color: 'orange',
                                textAlign: 'center',
                                fontSize: '15px'
                            }}>{group.paddr.split(" ")[1]} {group.paddr.split(" ")[2]}</h5>
                            <p className="card-text"></p><p id="lorem" style={{textAlign: 'center'}}>{group.ptel}</p>
                        </div></Link>
                    </div>
                </div>
            )
        );
    }
}

export default withRouter(SearchBody);