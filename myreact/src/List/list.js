import React, { Component } from 'react';
import './bootstrap.min.css';
import './common.css';
import './styles.min.css';
import Pagination from '../Pagination/listPagination';
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import ListBody from "./ListBody";


class List extends Component {

  state = {
    isLoading: true,
    groups: [],
    cate: "",
    page: "",
    sort: "list/cate/"
  };

  async componentDidMount() {
    const cate = this.props.match.params.cate;
    let label = "";
    if(cate == 'jeju')
      label = '/jeju';
    if(cate == 'seo')
      label = '/seo';
    if(cate == 'island')
      label = '/island';
    const response = await fetch('/api/list' + label +'?page='+(this.props.match.params.page-1));
    const body = await response.json();

    const page = this.props.match.params.page;
    this.setState({groups: body, isLoading: false, cate: cate, page: page})
  }

  render() {
    const {groups, isLoading, cate, page, sort} = this.state;

    if (isLoading) {
      return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}>Loading...</div>;
    }

    return (
        <div style={{minHeight: '1550px'}}>
        <div className="py-5">
          <div className="container" style={{marginTop: '100px'}}>
            <Route path="/jejumaru/list/cate/:cate/page/:page"><Category
              totalPage = {groups.totalPages}
              param = {cate}
              curPage = {page}
              sort = {sort}
            /></Route>

              </div>
        </div>

        </div>
    );
  }
}

function Category({totalPage, param, curPage, sort}){
  return(
      <>
      <div className="filtr-controls text-center lead text-uppercase mb-3">
              <span className="d-inline-block mx-3 py-1 position-relative cateAll"><Link
                  className="text-dark text-decoration-none" to="/jejumaru/list/cate/all/page/1">전체</Link></span>
        <span className="d-inline-block mx-3 py-1 position-relative cateJeju"><Link
            className="text-dark text-decoration-none" to="/jejumaru/list/cate/jeju/page/1">제주시</Link></span>
        <span className="d-inline-block mx-3 py-1 position-relative cateSeo"><Link
            className="text-dark text-decoration-none" to="/jejumaru/list/cate/seo/page/1">서귀포시</Link></span>
        <span className="d-inline-block mx-3 py-1 position-relative cateIsland"><Link
            className="text-dark text-decoration-none" to="/jejumaru/list/cate/island/page/1">섬 속의 섬</Link></span>
      </div>
        <Route path="/jejumaru/list/cate/:cate/page/:page" component={withRouter(Pagination)}/>
        </>
  );
}



export default withRouter(List);
