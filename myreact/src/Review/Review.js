import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from "google-maps-react";
// import logo from './logo.svg';
// import './App.css';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/fontawesome-all.min.css'
import './assets/fonts/font-awesome.min.css'
import './assets/fonts/simple-line-icons.min.css'
import './assets/fonts/fontawesome5-overrides.min.css'
import './assets/css/styles.min.css'
import './detailpage.css'
import {Link, Route, withRouter} from 'react-router-dom';
import $ from 'jquery';
import DetailPagination from "../Pagination/detailPagination";

// function ReviewSS(){
//   return(

//   )
// }

class Review extends Component {
    state = {
        isLoading: true,
        groups: [],
        places: [],
        pno: "",
        curPage: "",
        sort: "detail/pno/"
    };

    async componentDidMount() {
        const pno = this.props.match.params.pno;
        const response = await fetch('/api/review/'+ pno +'?page='+(this.props.match.params.page-1));
        const placeResponse = await fetch('/api/detail/' + pno);
        const body = await response.json();
        const placeBody = await placeResponse.json();
        const page = this.props.match.params.page;
        this.setState({groups: body, places: placeBody, isLoading: false, pno: pno, curPage: page})

        let i = 0;
        $("#btnAdd").click(function(){
            $("#files").append("<div class='picadd'><input type='file' name = 'upfile" +i+ "'/><button type='button' onclick='$(this).parent().remove()'><i class='far fa-trash-alt'></i></button></div>");
            i++;
        });
    }

    render() {
        const {groups, places, isLoading, pno, curPage, sort} = this.state;

        const mapStyles = {
            position: 'absolute',
            height: "550px",
            width: "100%"
        };

        const styles = {
            position: 'relative',
            height: "550px",
            width: "100%"
        };

        if (isLoading) {
            return <p>Loading...</p>;
        }



        return (

            <div className="container section">
                <div className="container">
                    <div id="main_area">
                        <div className="row">
                            <div className="col-xs-12" id="slider">
                                <div className="row">
                                    <div className="col-sm-8" id="carousel-bounding-box">
                                        <div className="active item" data-slide-number="0">
                                            <img src={places.pimg} style={{width: '100%'}}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4" id="carousel-text">
                                        <div id="slide-content">
                                            <div id="slide-content-0">
                                                <div className="detail-list">
                                                    <h1 className="my-4 title">{places.ptitle}</h1>
                                                    <span className="ssang">"</span>
                                                    <span className="my-3 introduction">{places.pintro.split(".")[0]}</span>
                                                    <span className="ssang">"</span>
                                                    <br/>
                                                    <div>주소 : <span className="address">{places.paddr}</span></div>
                                                    <div>번호 : <span className="phoneno">{places.ptel}</span></div>
                                                    <div>OPEN : <span className="opentime">{places.popentime}</span></div>
                                                    <div>CLOSE : <span className="closetime">{places.pclosetime}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="wleh">
                    <span><i className="fas fa-map-marker-alt"/>지도</span>
                </div>

                <div id="jejuMap" style={{width: '100%', height: '550px'}}>
                    <Map
                        style={styles}
                        containerStyle={mapStyles}
                        google={this.props.google}
                        zoom={15}
                        initialCenter={{ lat: places.plat, lng: places.plong }}
                    ></Map>
                </div>

              {/*  <div className="flqb"><span><i className="far fa-sticky-note"/>리뷰</span></div>*/}
              {/*  <div className="review-wrap-wrap">*/}
              {/*      <Route path="/jejumaru/detail/pno/:pno/page/:page" component={withRouter(DetailPagination)}/>*/}

              {/*      /!* <jsp:include page="pagination.jsp">*/}
              {/*        <jsp:param value="${requestScope.writePages }" name="writePages"/>*/}
              {/*        <jsp:param value="${requestScope.totalPage }" name="totalPage"/>*/}
              {/*        <jsp:param value="${requestScope.curPage }" name="curPage"/>*/}
              {/*        </jsp:include> *!/*/}

              {/*      <div className="Tmrl"><i className="fas fa-edit"/>리뷰쓰기</div>*/}
              {/*      /!* <c:if test='${sessionScope.id eq null }'> *!/*/}
              {/*      <div className="reviewNO">리뷰쓰기는 로그인이 필요합니다 *^^*</div>*/}

              {/*      /!* </c:if> *!/*/}


              {/*      /!* <c:choose> *!/*/}
              {/*      /!* <c:when test="${sessionScope.id ne null }"> *!/*/}

              {/*      <form name="frm" action='detailpage/writeOk.do?pno=${pno }' method="post" onsubmit="return chkSubmit()"*/}
              {/*            enctype="Multipart/form-data">*/}


              {/*          <div className="review-write">*/}
              {/*              <div className="write-wrap">*/}


              {/*                  <div className="username">session.getAttribute("id")</div>*/}
              {/*                  <input type="hidden" name="rmno" value=" session.getAttribute('mno')"/>*/}
              {/*                  <input type="hidden" name="rplace" value="${pno }"/>*/}
              {/*                  <button type="submit" className="review-submit"> 입력 </button>*/}

              {/*                  <div className="startRadio" >*/}
              {/*                      <label className="startRadio__box">*/}
              {/*                          <input type="radio" name="rstar" id="" value="0.5" checked="checked"/>*/}
              {/*                          <span className="startRadio__img"><span className="blind">0.5</span></span>*/}
              {/*                      </label>*/}

              {/*                       <label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="1"/>*/}
              {/*<span className="startRadio__img"><span className="blind">1</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="1.5"/>*/}
              {/*<span className="startRadio__img"><span className="blind">1.5</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="2"/>*/}
              {/*<span className="startRadio__img"><span className="blind">2</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="2.5"/>*/}
              {/*<span className="startRadio__img"><span className="blind">2.5</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="3"/>*/}
              {/*<span className="startRadio__img"><span className="blind">3</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="3.5"/>*/}
              {/*<span className="startRadio__img"><span className="blind">3.5</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="4"/>*/}
              {/*<span className="startRadio__img"><span className="blind">4</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="4.5"/>*/}
              {/*<span className="startRadio__img"><span className="blind">4.5</span></span>*/}
              {/*</label>*/}
              {/*<label className="startRadio__box">*/}
              {/*<input type="radio" name="rstar" id="" value="5"/>*/}
              {/*<span className="startRadio__img"><span className="blind">5</span></span>*/}
              {/*</label>*/}

              {/*                  </div>*/}

              {/*                  <textarea className="textwrtie" rows="10" cols="16" name="rcontent" onKeyUp="javascript:fnChkByte(this,'500')" placeholder="리뷰를 남겨주세요!"/>*/}
              {/*                  <span id="byteInfo">0</span><span className="dhqor">/500</span>*/}
              {/*                  <br/>*/}

              {/*                  <button type="button" id="btnAdd"><i className="fas fa-camera"/></button>*/}

              {/*                  <div id="files"/>*/}
              {/*              </div>*/}
              {/*          </div>*/}
              {/*      </form>*/}
                    {/* </c:when> */}
                    {/* <c:otherwise> */}
                    <div style={{height: "200px"}}>
                    </div>
                    {/* </c:otherwise>
          </c:choose> */}
                {/*</div>*/}
            </div>
        );
    }
}


export default GoogleApiWrapper({apiKey: "AIzaSyDEB_jTOd7HufTs0QET3gfw-MQ2qF4Xf5Q&callback=myMap"})(withRouter(Review));