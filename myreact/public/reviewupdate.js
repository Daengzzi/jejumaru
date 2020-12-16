// 리뷰 JS


(function(){
    $('.updateXX').hide();



    $(".rupdate").click(function(event) {
        alert("뭔버튼?");
       if($("button[class=updatechk]:visible").length == 0){
       
        var $this = $(event.target); //수정버튼
        var rno = $this.parents(".review-wrap").children("form[name=updateForm]").children("input:hidden[name=rno]").val();
        //$this.css("displat","none");
        //$(".updatechk").css("display","block");
        var $reviewWrap = $this.parents(".review-wrap");
        var $reviewText = $($reviewWrap).children("form[name=updateForm]").children(".review-text");
        //$("#hhyrno").value(rno);
        //원본 텍스트 = $(".review-text").html()
        var onebon =  $($reviewText).text();
        var rupd = "<textarea name='review-text' class='updatetext'>"+ onebon +"</textarea>";
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
      
    })
 })();



 $("button[class=updatechk]").click(function(e) {
     alert("뭔버튼?");
    var $this = $(e.target);
    var $img_src = $this.parents(".review-wrap").children("form[name=updateForm]").children(".reviewImg").children(".updateImg").children(".img-wrap");
    var $updatefile = $img_src.parents(".updateImg").children(".updatefile-wrap").children("#updatefiles").children(".picadd").children("input:file");
    var rno = $this.parents(".review-wrap").children("form[name=updateForm]").children("input:hidden[name=rno]").val();
    var rcontent = $this.parents(".review-wrap").children("form[name=updateForm]").children(".updatetext").val();
    var rimg = "";
    for(var i = 0; i < $img_src.length; i++){
       if(i == $img_src.length - 1){
          rimg += $($img_src[i]).text().trim();
       } else {
          rimg += $($img_src[i]).text().trim() + ";";
       }
    }
    if($updatefile.length != 0){
       for(var i = 0; i < $updatefile.length; i++){
          if(i == $updatefile.length - 1){
             rimg += ";upload/"+$updatefile[i].files[i].name;
          } else {
             rimg += ";upload/"+$updatefile[i].files[i].name;
          }
       }
    }
    
    console.log(rimg);
    
    
    var url = "review.ajax?reqType=json&rno="+rno+"&rcontent="+rcontent+"&rimg="+rimg;
    
      $.ajax({
            url :  url,
              type : "POST",
         data : new FormData($this.parents(".review-wrap").find("form#updateForm")[0]),
          processData: false,
          contentType: false,
         cache : false,
         success : function(data, status){
            if(status == "success") 
               parseJSON(data);
            }
        });
        console.log("왜??" +url);
 });

function parseJSON(jsonObj){
   var data = jsonObj.data;
   if(jsonObj.status == 'OK'){
      alert("수정했습니다.")
      window.location.reload();
      
   }
   
   if(jsonObj.status == 'FAIL'){
      alert("실패했습니다aa.")
   }
   
    // end for
} // end parseJSON()
 
function fnChkByte(obj, maxByte){
    
    var str = obj.value;
    var str_len = str.length;


    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for(var i=0; i<str_len; i++){

        one_char = str.charAt(i);
        if(escape(one_char).length > 4)
        {
            rbyte += 2;     //한글 2Byte
        }
        else
        {
            rbyte++;  //영문 등 나머지 1Byte
        }


        if(rbyte <= maxByte)
        {
            rlen = i+1;  //return할 문자열 갯수
        }
    }

    if(rbyte > maxByte){

    // alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
    alert("리뷰는 최대 " + maxByte + "byte를 초과할 수 없습니다.")
    str2 = str.substr(0,rlen);                                  //문자열 자르기
    obj.value = str2;
    fnChkByte(obj, maxByte);
    }
    else
    {
        document.getElementById('byteInfo').innerText = rbyte;
    }
}



function changeView(value){
    
    if(value == "0") // HOME 버튼 클릭시 메인으로 이동
    {
        location.href="main.do";
    }
    else if(value == "1") // 로그인 버튼 클릭시 로그인 화면으로 이동
    {
        location.href="login.do";
    }
    else if(value == "2") // 회원가입 버튼 클릭시 회원가입 화면으로 이동
    {
        location.href="login.do";
    }
    else if(value == "3") // 로그아웃 버튼 클릭시 로그아웃 처리
    {
        location.href="logout.do";
    }
    else if(value == "4") // 회원정보 수정 버튼 클릭시 회원 확인 화면으로 이동
    {
        location.href="infochk.do";
    }
    else if(value == "5") // 비밀번호 확인 후 인증되면 비밀번호 변경 화면으로 이동
    {
        location.href="modify.do";
    }
    
}



// 탑버튼 
$( window ).scroll(function() {
    if ( $( this ).scrollTop() > 200 ) {
       $( '.topBtn' ).fadeIn();
    } else {
       $( '.topBtn' ).fadeOut();
    }
 } );
 
 $(document).ready(function(){
    $( '.topBtn' ).click( function() {
       $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
       return false;
     } );
     
 } );
     

  