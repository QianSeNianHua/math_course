<?php
//退出登录
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
require_once(realpath(dirname(__FILE__) . "/../") . "/common/connection.php");
error_reporting(0);
class Logout{
	private $conn;
    /*
    *  构造函数，建立数据库连接
    */
    public function __construct() {
        $this->conn = new Connection();
    }
	public function logout(){
	    if(!empty($_COOKIE["username"])){
			setcookie("username",'null',time()-3600,'/');
			echo  json_encode(array('status'=>true));//返回json格式数据
		}else{
			echo  json_encode(array('status'=>false));//返回json格式数据
		}
	}
}
?>