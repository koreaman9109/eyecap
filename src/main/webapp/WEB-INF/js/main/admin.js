jQuery(document).ready(function($){
	
	$('#popupLogin').click(function(event){  //버튼을 클릭 했을시 popupOpen 함수 출력 
        console.log('click');
        popupOpen();	//Popup Open 함수
    });
  
	function popupOpen(){
		var url= "popupLogin.do";    //팝업창 페이지 URL
		var winWidth = 700;
	    var winHeight = 600;
	    var popupOption= "width="+winWidth+", height="+winHeight;    //팝업창 옵션(optoin)
		window.open(url,"",popupOption);
	}
	
});

//파일 버튼 교체 스크립트
/*$(function(){          
	$('#fileSearch').click(function(e){
		e.preventDefault();             
		$('input[type=file]').last().click();               
	});                         
});
*/

$(document).ready(function(){ 
	
	
	$(document).on("click", ".fileSearch", function(e) {
	e.preventDefault();
	var i = "";
    i =$(this).attr('idx');
	$('#input-file'+i).click();
	var fileTarget = $('#input-file'+i); 
	fileTarget.on('change', function(){ // 값이 변경되면 
		if(window.FileReader){ // modern browser 
			var filename = $(this)[0].files[0].name; 
			} else { // old IE 
				var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
				} // 추출한 파일명 삽입 
		$(this).siblings('#upload-name'+i).val(filename); 
		}); 
	});    
	
	$(document).on("click", "#addbt", function(e) {
		e.preventDefault();
	var fileIndex = $("#fileDiv").children().length+1-1;
	$("#fileDiv").append(
			'<div class="filebox preview-image" id="fileIndex">' +
			'<input class="upload-name" id="upload-name'+fileIndex+'" value="Filename">' + 
			'<label for="input-file" class="fileSearch" id="fileSearch'+fileIndex+'" idx="'+fileIndex+'">SEARCH</label>' +
			'<input type="file" id="input-file'+fileIndex+'" name="uploadfile" class="upload-hidden">' +
			'</div>');
	});
	
	$(document).on("click", "#aDelete", function(e) {
		e.preventDefault();
		
		var i = "";
        i =$(this).attr('idx');
     
        var key = i.split('*');

        
        var id = key[0];
        var division = key[1];
        
		var acStartPage = $('#archaveStartPageList').val();
		var fnqStartPage = $('#fnqStartPageList').val(); 
		if (confirm("정말 삭제하시겠습니까??") == true){    //확인
			$.ajax({
				type : "post",
				url : "/board_delete.do?board_seq="+id,
				data : id,
				dataType : "json",
				success : function(data) {
					if(data.code == '1') {
			            alert("게시글이 삭제되었습니다.");
/*			            location.reload();*/
			            if (division == 'archave') {
			            	$.ajax({ 
	    						type: 'post' , 
	    						url: '/archaveList.do?startPage='+ acStartPage +'&visiblePages=10',
	    						cache : false,
	    						dataType : 'text' ,
	    						success: function(data) { 
	    							/* $('#pagination').empty(); */
	    							$('#archaveList').empty();
	    							$('#archaveList').html(data);
	    							/* $("#pagination").append(pagination); */
	    						} 
	    					});	
						}else if (division == 'fnq') {
			            	$.ajax({ 
	    						type: 'post' , 
	    						url: '/fnqList.do?startPage='+ fnqStartPage +'&visiblePages=5',
	    						cache : false,
	    						dataType : 'text' ,
	    						success: function(data) { 
	    							/* $('#pagination').empty(); */
	    							$('#fnqList').empty();
	    							$('#fnqList').html(data);
	    							/* $("#pagination").append(pagination); */
	    						} 
	    					});	
						}
			            
			        } else {
			            alert("code:" + data.code + "\n" + "msg:" + data.msg);
			        }    
				},
				error : function(request, status, error) {
					alert("code:" + request.status + "\n" + "error:" + error);
					location.reload();
				}
			})
		}
		
	});

	
		$(document).on("click", "#writeAcSubmit", function(e) {
		/*var params = $("#archave_form").serialize();*/
		var form = $('#archave_form')[0];
	    var params = new FormData(form);
	    if (confirm("글을 등록 하시겠습니까?") == true){    //확인
			// 제목 유효성 검사
			if($(".acboard_title").val() == '' || $(".acboard_title").val() == null ){
			    alert("제목을 입력해주세요.");
			    return false;
			}
			if($(".acboard_title").val().length > 41){
			    alert("제목은 40자이상 입력할 수 없습니다.");
			    return false;
			}
		$.ajax({
			type : "POST",
			url : "/mainBoardAction.do",
			enctype: "multipart/form-data",
			processData: false,
            contentType: false,
			data : params,
			dataType : "json",
			success : function(data) {
				if(data.code == '1') {
		            alert("게시글이 등록되었습니다.");
/*		            location.reload();*/
		        	$.ajax({ 
		    			type: 'post' , 
		    			url: '/archaveList.do',
		    			cache : false,
		    			dataType : 'html' ,
		    			success: function(data) {
		    				$('#archaveList').empty();
		    				$('#archaveList').html(data);

		    			} 
		    		});
		        } else {
		            alert("code:" + data.code + "\n" + "msg:" + data.msg);
		        }    
			},
			error : function(request, status, error) {
				alert("code:" + request.status + "\n" + "error:" + error);
			}
		});
	    }
	});
	
		
		
		$(document).on("click", "#modifyAcSubmit", function(e) {
//			var params = $("#archave_form").serialize();
//			var params = new FormData($('#archave_form')[0]);
			var form = $('#archave_form')[0];
		    var params = new FormData(form);
		    var startPage = $('#archaveStartPageList').val(); 
		    var visiblePages = 10;//리스트 보여줄 페이지
		    if (confirm("글을 등록 하시겠습니까?") == true){    //확인
				// 제목 유효성 검사
				if($(".acboard_title").val() == '' || $(".acboard_title").val() == null ){
				    alert("제목을 입력해주세요.");
				    return false;
				}
				if($(".acboard_title").val().length > 41){
				    alert("제목은 40자이상 입력할 수 없습니다.");
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
    						type: 'post' , 
    						url: '/archaveList.do?startPage='+ startPage +'&visiblePages='+visiblePages ,
    						cache : false,
    						dataType : 'text' ,
    						success: function(data) { 
    							/* $('#pagination').empty(); */
    							$('#archaveList').empty();
    							$('#archaveList').html(data);
    							/* $("#pagination").append(pagination); */
    						} 
    					});
/*			            location.reload();*/
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
		
		//파일 다운로드
		$(document).on("click", "#downFile", function(e) {
			e.preventDefault();
			var i = "";
	        i =$(this).attr('idx');
			var file_name = i.split('*');
			if(file_name[1] == "archave"){
				location.href="boardFileDown.do?file_name="+encodeURI(file_name[0])+"&board_division="+file_name[1]+"&file_seq="+file_name[2];
			}
		});
		
		//수정폼에서 기존 업로드된 파일 삭제시 id 값 c --> d로 변환시킴
		$(document).on("click", "#delFile", function(e) {
			e.preventDefault();
			var i = "";
		    i =$(this).attr('idx');
			var obj = $('#flist_' + i);
			var obj2 = $('#addfile_' + i);
			if ($('#board_division').val() == "portfolio"){
				$('#newFile').attr('disabled', false);
			}
			$(obj).find('#flag').val("D");
			$(obj).hide();
			$(obj2).show();
			
		});
		
		$(document).on("click", "#user_login", function(e) {
			alert("작업 중 입니다.");
		});
		
		$(document).on("click", "#login_btn", function(e) {

			var params = $("#login_form").serialize()
			if ($("#loginDivision").val() == 'adminLogin') {
				if ($("#admin_id").val().length < 1) {
					alert("아이디를 입력하세요.");
					this.focus();
					return false;
				} else if ($("#admin_pwd").val().length < 1) {
					alert("비밀번호를 입력해주세요");
					this.focus();
					return false;
				}
					$.ajax({
					type : "POST",
					url : "/loginTry.do",
					data : params,
					dataType : "json",
					success : function(data) {
						fail=data.fail;
						sucess=data.sucess;
						if (fail == "fail") {
							alert('로그인에 실패하였습니다.');
						} else if(sucess == "sucess"){
							alert('로그인에 성공하였습니다.');
							opener.document.location.reload();
							self.close();
						}
					},
					error : function(request, status, error) {
						alert("code:" + request.status + "\n" + "error:" + error);
					}
				})
			}else if($("#loginDivision").val() == 'corpUserLogin'){
				if ($("#user_id").val().length < 1) {
					alert("아이디를 입력하세요.");
					this.focus();
					return false;
				}
				$.ajax({
					type : "POST",
					url : "/loginTry.do",
					data : params,
					dataType : "json",
					success : function(data) {
						fail=data.fail;
						sucess=data.sucess;
						if (fail == "fail") {
							alert('로그인에 실패하였습니다.');
						} else if(sucess == "sucess"){
							alert(data.corp_id+'로그인에 성공하였습니다.');
							window.location.reload();
							self.close();
						}
					},
					error : function(request, status, error) {
						alert("code:" + request.status + "\n" + "error:" + error);
					}
				})
			}
				
				
				
		});
	});


