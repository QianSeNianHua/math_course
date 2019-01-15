<?php
//退出登录
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
function logout(){
	header("content-type:text/html;charset=utf-8");
    if(!empty($_COOKIE["username"])){
		setcookie("username",'null',time()-3600,'/');
		echo "<script>alert('退出成功')</script>";
		header("location:html/adminLogin.html");
	}else{
		echo "<script>alert('退出失败')</script>";
		header("location:html/index1.html");
		}
}
echo logout();
 ?>