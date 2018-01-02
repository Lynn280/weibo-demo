window.onload=function(){
	//刷新页面时，输入字数的记录（针对FF和IE刷新保留文本框文字）
	var text_word=document.getElementById('enter-msg');
	checkRestLength(text_word.value,140);
	//头像选择事件
	var faces=document.getElementById('face-list').getElementsByTagName('img');
	for (var i = 0; i < faces.length; i++) {
		faces[i].onclick=function(){
			for(var j=0;j<faces.length;j++){
				faces[j].className='';
			}
			this.className='select-face';
		}
	}
	//广播添加事件
	var submit_btn=document.getElementById('submit-btn');
	submit_btn.onclick=submitMSG;
	function submitMSG(){
		var new_name_obj=document.getElementById('enter-name');
		var new_msg_obj=document.getElementById('enter-msg');
		var limit_tips=document.getElementById('limit_tips').innerHTML;
		var new_name=new_name_obj.value;
		var new_msg=new_msg_obj.value;
		if (new_name=="") {
			alert('请输入您的名字！');
		}else if(new_msg==""){
			alert('随便说点什么吧！');
		}else if(limit_tips.indexOf('已超出')!=-1){
			alert('内容需要精简一下下哦~');
		}else{
			//创建容器
			var new_msg_box=document.createElement('li');
			//创建头像
			var new_face=document.createElement('div');
			new_face.className='face-box';
			var new_face_img=document.createElement('img');
			var face_origin=document.getElementById('face-list').getElementsByTagName('img');
			var face_index=0;
			for(var z=0;z<face_origin.length;z++){
				if (face_origin[z].className.indexOf('select-face')>-1) {
					face_index=z+1;
				}
			}
			new_face_img.src='img/face'+face_index+'.gif';
			new_face.appendChild(new_face_img);
			new_msg_box.appendChild(new_face);
			//创建内容
			var new_text=document.createElement('div');
			new_text.className='text';
			var p1=document.createElement('p');
			p1.innerHTML='<span class="user-name">'+new_name+'：</span>'+new_msg;
			new_text.appendChild(p1);
			var p2=document.createElement('p');
			p2.className='time-delete';
			var new_date=getNowDate();
			p2.innerHTML='<span>'+new_date+'</span><span class="delete" onclick="deleteMSG(event)">删除</span>';
			new_text.appendChild(p2);
			new_msg_box.appendChild(new_text);
			//添加到网页
			var msg_list=document.getElementById('msg-list');
			msg_list.insertBefore(new_msg_box,msg_list.childNodes[0]);
			//清除输入框文本
			new_name_obj.value='';
			new_msg_obj.value='';
			//字数恢复
			var limit_tips=document.getElementById('limit_tips');
			limit_tips.innerHTML='还能输入<i>140</i>个字';
		}
	}
	//设置提交广播的快捷键ctrl+enter
	document.onkeydown=function(e){
		var event=window.event||e;
		if (event.ctrlKey&&(event.keyCode==13||event.which==13)) {
			submitMSG();
		}
	}
} //window.onload结束
//获取当前时间
function getNowDate(){
	var mydate=new Date();
	var month=add0(mydate.getMonth()+1);
	var day=mydate.getDate();
	var hour=add0(mydate.getHours());
	var min=add0(mydate.getMinutes());
	return month+'月'+day+'日'+' '+hour+':'+min;
}
function add0(num){
	if (num<=9) {
		num='0'+num;
	}
	return num;
}
//删除广播
function deleteMSG(e){
	var event=window.event||e;
	var obj=event.target||event.srcElement;
	var delete_msg=obj.parentNode.parentNode.parentNode;
	var delete_msg_parent=delete_msg.parentNode;
	delete_msg_parent.removeChild(delete_msg);
}
//获取可输入信息的长度
function checkRestLength(str,maxLength){
	var str_length=Math.floor(getStrLength(str)/2);
	var limit_tips=document.getElementById('limit_tips');
	if(str_length>maxLength){
		limit_tips.innerHTML='已超出<i style="color:red">'+(str_length-maxLength)+'</i>个字';
	}else{
		limit_tips.innerHTML='还能输入<i>'+(maxLength-str_length)+'</i>个字';
	}
}
function getStrLength(str){
	var str_length=0;
	var z;
	for(var i=0;i<str.length;i++){
		z=str.charCodeAt(i);
		if(z<0x4E00||z>0x9FA5){//目前在unicode标准中，汉字的charCode范围是[0x4E00, 0x9FA5]  
			str_length++;
		}else{
			str_length+=2;
		}
	}
	return str_length;
}