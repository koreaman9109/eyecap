<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script type="text/javascript">
			$(document).ready(function() {
				
				/* // 네이버 에디터  
				var oEditors = [];
				
				nhn.husky.EZCreator.createInIFrame({
					oAppRef: oEditors,
					elPlaceHolder: "content",
					sSkinURI: "util/naver_edit/SmartEditor2Skin.html",
					fCreator: "createSEditor2",
					htParams : { // 툴바 사용 여부 (true:사용/ false:사용하지 않음) 
						bUseToolbar : true, // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음) 
						bUseVerticalResizer : true, // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음) 
						bUseModeChanger : true, 
					}
				});	 */
				
				$(document).on("click", "#modifyFnQSubmit", function(e) {
					e.preventDefault();
					var str = $('#content').val();

					str = str.split('<br>').join("\r\n");

					$('#content').val(str);
				    /* oEditors.getById["content"].exec("UPDATE_CONTENTS_FIELD", []); */
//					var params = $("#FnQ_form").serialize();
//			var params = new FormData($('#archave_form')[0]);
			var form = $('#FnQ_form')[0];
		    var params = new FormData(form);
		    var startPage = $('#fnqStartPageList').val(); 
		    var visiblePages = 5;//리스트 보여줄 페이지
		    if (confirm("글을 등록 하시겠습니까?") == true){    //확인
				// 제목 유효성 검사
				if($(".fnqboard_title").val() == '' || $(".fnqboard_title").val() == null ){
				    alert("제목을 입력해주세요.");
				    return false;
				}
				if($(".fnqboard_title").val().length > 41){
				    alert("제목은 40자이상 입력할 수 없습니다.");
				    return false;
				}
				
				// 내용 유효성 검사
				var ir1 = $("#content").val();

		        if(ir1 == '<br>' || ir1 == ""  || ir1 == null || ir1 == '&nbsp;' || ir1 == '<p>&nbsp;</p>')  {
		             alert("내용을 입력하세요.");
		             oEditors.getById["content"].exec("FOCUS"); //포커싱
		             return false;
		        }
					$.ajax({
						type : "POST",
						url : "/ModifyAction.do",
						enctype: "multipart/form-data",
						processData: false,
			            contentType: false,
						data : params,
						dataType : "json",
						success : function(data) {
							if(data.code == '1') {
								alert("게시글이 수정되었습니다.");
								$.ajax({ 
		    						type: 'POST' , 
		    						url: '/fnqList.do?startPage='+ startPage +'&visiblePages='+visiblePages,
		    						dataType : 'text' ,
		    						success: function(data) { 
		    							/* $('#pagination').empty(); */
		    							$('#fnqList').empty();
		    							$('#fnqList').html(data);
		    							/* $("#pagination").append(pagination); */
		    						} 
		    					});
								/* window.location.reload(); */
							} else {
								alert("code:" + data.code + "\n" + "msg:" + data.msg);
							} 
						},
						error : function(request, status, error) {
							alert("code:" + request.status + "\n" + "error:" + error);
						}
					})
		    }
				});
			
				});	
				</script>
						<h4 class="pop_master_tit">
                                Support-FAQ<br>Write new post
                            </h4>
                            <input type="hidden" id="board_seq" name="board_seq" value="${board_read.board_seq}">
                        <input type="hidden" id="board_division" name="board_division" value="${board_read.board_division}">
                            <input id="pop_master_faq_tit" class="fnqboard_title" name="board_title" type="text" value="${board_read.board_title}" placeholder="Title">
                            <textarea id="content" name="board_content">${board_read.board_content}</textarea>
                            <ol class="pop_master_btn">
                                <li>
                                    <!-- <a href="" class="pop_master_btn_modify" onclick="modifyFnQSubmit();">Submit</a> -->
                                    <a style="cursor: pointer;" id="modifyFnQSubmit" class="pop_master_btn_modify" >Submit</a>
                                </li>
                                 <li>
                                    <a href="" class="pop_master_btn_delete">Delete</a>
                                </li>
                                 <li class="margin_none">
                                    <a onclick="Close();" class="pop_master_btn_cancle">Cancle</a>
                                </li>
                            </ol>