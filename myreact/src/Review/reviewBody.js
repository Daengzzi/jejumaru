import React, { Component } from "react";
import {BrowserRouter, Link, Route, withRouter} from 'react-router-dom';
import $ from "jquery";

class reviewBody extends Component{
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

        $(".updatechk").hide();
        $(".updateXX").hide();
        $(".updateImg").hide();

        function updateBtn($this) {
            if($("button[className=updatechk]:visible").length == 0){
                let $review_wrap = $($this).parents(".review-wrap");

                $review_wrap.children("form[name=updateForm]").children(".review").children(".updatechk").show();
                $($this).hide();
                $review_wrap.children("form[name=updateForm]").children(".reviewImg").children(".imgs").hide();
                $review_wrap.children("form[name=updateForm]").children(".reviewImg").children(".updateImg").show();

            }
        }

        let i = 0;
        function appendBtn(updatefiles){
            console.log(updatefiles)
            $(updatefiles).html($(updatefiles).html() + "<div className='picadd'><input type='file' name = 'upfile" +i+ "'/><button type='button' onClick='$(this).parent().remove()'>삭제</button></div>");
            i++;
        };



        $(".rupdate").click(function(event) {
            alert("뭔버튼?");
            if($("button[className=updatechk]:visible").length == 0){

                let $this = $(event.target); //수정버튼
                let rno = $this.parents(".review-wrap").children("form[name=updateForm]").children("input:hidden[name=rno]").val();
                //$this.css("displat","none");
                //$(".updatechk").css("display","block");
                let $reviewWrap = $this.parents(".review-wrap");
                let $reviewText = $($reviewWrap).children("form[name=updateForm]").children(".review-text");
                //$("#hhyrno").value(rno);
                //원본 텍스트 = $(".review-text").html()
                let onebon =  $($reviewText).text();
                let rupd = "<textarea name='review-text' className='updatetext'>"+ onebon +"</textarea>";
                $this.parents(".review-wrap").find("#hhyrno").val(rno);
                $($reviewText).replaceWith(rupd);
                $this.parents(".review-wrap").children(".review").children(".updatechk").show();
                $this.parents(".review-wrap").children(".review").children(".updateXX").show();
                $this.hide();
            } else {
                alert("동시에 여러개의 리뷰 수정 불가능 ! ");
            }
        });

        $(".updateXX").click(function(){
            alert("수정을 취소합니다.")
            window.location.reload();

        });

        $("button[className=updatechk]").click(function(e) {
            alert("뭔버튼?");
            let $this = $(e.target);
            let $img_src = $this.parents(".review-wrap").children("form[name=updateForm]").children(".reviewImg").children(".updateImg").children(".img-wrap");
            let $updatefile = $img_src.parents(".updateImg").children(".updatefile-wrap").children("#updatefiles").children(".picadd").children("input:file");
            let rno = $this.parents(".review-wrap").children("form[name=updateForm]").children("input:hidden[name=rno]").val();
            let rcontent = $this.parents(".review-wrap").children("form[name=updateForm]").children(".updatetext").val();
            let rimg = "";
            for(let i = 0; i < $img_src.length; i++){
                if(i == $img_src.length - 1){
                    rimg += $($img_src[i]).text().trim();
                } else {
                    rimg += $($img_src[i]).text().trim() + ";";
                }
            }
            if($updatefile.length != 0){
                for(let i = 0; i < $updatefile.length; i++){
                    if(i == $updatefile.length - 1){
                        rimg += ";upload/"+$updatefile[i].files[i].name;
                    } else {
                        rimg += ";upload/"+$updatefile[i].files[i].name;
                    }
                }
            }

            console.log(rimg);


            let url = "review.ajax?reqType=json&rno="+rno+"&rcontent="+rcontent+"&rimg="+rimg;
            alert("수정했습니다.");
            // $.ajax({
            //     url :  url,
            //     type : "POST",
            //     data : new FormData($this.parents(".review-wrap").find("form#updateForm")[0]),
            //     processData: false,
            //     contentType: false,
            //     cache : false,
            //     success : function(data, status){
            //         if(status == "success")
            //             parseJSON(data);
            //     }
            // });
            console.log("왜??" +url);

        });

        function chkDelete(){
            // 삭제 여부, 다시 확인 하고 진행하기
            alert("체크");
            // let r = window.confirm("삭제하시겠습니까?");


            // if(r){
            //     window.location.href = 'detailpage/deleteOk.do?rno=' + rno + '&pno=<%=Integer.parseInt(request.getParameter("pno")) %>';
            // }
        } // chkDelete
    }

    render() {
        const {groups, isLoading, param, curPage, sort} = this.state;

        if (isLoading) {
            return <div style={{marginTop: '300px', minHeight: '500px', textAlign: "center"}}></div>;
        }

        let reviewWrap = [];
        let star;
        let reviewImg = [];
        let imgUrl = [];

        if(groups.totalElements == 0) {
            reviewWrap.push(<div className="reviewNO">리뷰가 없습니다. 리뷰를 등록해주세요.<i className="far fa-frown"/></div>);
        } else {
            for (let k = 0; k < groups.numberOfElements; k++) {
                switch(groups.content[k].rstar){

                    case 0.5:
                        star = <><i className="fas fa-star-half-alt"></i>
                            <span>0.5</span></>;
                        break;
                    case 1.0:
                        star = <><i className="fas fa-star"></i>
                            <span>1.0</span></>;
                        break;
                    case 1.5:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span>1.5</span></>;
                        break;
                    case 2.0:
                        star =  <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span>2.0</span></>;
                        break;
                    case 2.5:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span>2.5</span></>;
                        break;
                    case 3.0:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span>3.0</span></>;
                        break;
                    case 3.5:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span>3.5</span></>;
                        break;
                    case 4.0:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span>4.0</span></>;
                        break;
                    case 4.5:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span>4.5</span></>;
                        break;
                    case 5.0:
                        star = <><i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span>5.0</span></>;
                        break;
                }

                let imgNum = 1;
                if(groups.content[k].rimg != null){
                    for (let imgIndex = 0; imgIndex < groups.content[k].rimg.split(";").length; imgIndex++) {
                        imgNum++;
                        reviewImg.push(<img style={{height: "auto"}} src={groups.content[k].rimg.split(";")[imgIndex]}/>);
                        imgUrl.push(<div className="img-wrap">
                            <input name={"img"+imgNum} type="hidden" value={groups.content[k].rimg.split(";")[imgIndex]}/>
                            <div className="img_src">{groups.content[k].rimg.split(";")[imgIndex]}</div>
                            <input type="button" onClick='$(this).parent().remove()' value="삭제"/>
                        </div>);
                    }
                }

                reviewWrap.push(<div className="review-wrap">
                    <div className="review">
              <span className="star">

                  {star}
              </span>
                        {/* <c:choose>
              <c:when test="${element.mid eq sessionScope.id }"> */}
                        <button type="button" className="deletebnt" onClick="chkDelete()"><i
                            className="far fa-trash-alt"/>
                        </button>
                        <button type="button" className="rupdate" onClick="updateBtn(this)"><i
                            className="fas fa-eraser"/>
                        </button>
                        <button type="button" className="updatechk"><i className="fas fa-check"/></button>
                        <button type="button" className="updateXX">X</button>
                        {/* </c:when>
              <c:otherwise>
              </c:otherwise>
              </c:choose> */}
                        <br/>
                        <span className="username">{groups.content[k].member.mid}</span>
                        <span className="line">|</span>
                        <span className="regdate">{groups.content[k].rdate.split("T")[0]}</span>
                    </div>
                    <form name="updateForm" id="updateForm" action="detailpage/updateOk.do?pno=${pno }" method="POST"
                          enctype="Multipart/form-data" accept-charset="UTF-8">
                        <input name="rno" type="hidden" id="hhyrno" value={groups.content[k].rno}/>
                        <div className="review-text" style={{whiteSpace: "pre-wrap"}}>{groups.content[k].rcontent}</div>
                        <div className="reviewImg" style={{width: "100%"}}>
                            <div className="imgs">
                                {reviewImg}
                            </div>

                            <div className="updateImg">
                                {imgUrl}
                                <div className="updatefile-wrap">
                                    <button type="button" id="btnUpdate"
                                            onClick="appendBtn($(this).parent().children('#updatefiles'))"><i
                                        className="fas fa-camera"/></button>
                                    <div id="updatefiles"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>);
            }
        }

        return (
            <>
            {reviewWrap}
            </>
        );
    }
}

export default withRouter(reviewBody);