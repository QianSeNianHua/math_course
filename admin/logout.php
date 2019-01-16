<?php
//退出登录
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
class logout{
	public function logout(){
		header("content-type:text/html;charset=utf-8");
	    if(!empty($_COOKIE["username"])){
			setcookie("username",'null',time()-3600,'/');
			echo json_encode(array('status'=>true));
		}else{
			echo json_encode(array('status'=>false));
			}
	}
}
 ?>