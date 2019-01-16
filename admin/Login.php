<?php
/*
 * Created by PhpStorm.
 * User: dengjunle
 * Date: 2018/12/2
 * Time: 16:59
 * Function:判断登录的数据是否正确
 */
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
require_once(realpath(dirname(__FILE__) . "/../") . "/common/connection.php");
error_reporting(0);

class Login{
	private $conn;
    /*
    *  构造函数，建立数据库连接
    */
    public function __construct() {
        $this->conn = new Connection();
    }

	//方法：login()
	//返回值：true/false
	//作用：判断登录信息
	 public function login(){
		$t_No=trim($_POST["t_No"]);//老师账号
		$t_password=trim($_POST["t_password"]);//老师密码
		
		$sql="select * from teacher where t_No='$t_No' and t_password='$t_password'";
		$result=$this->conn->selectBySql($sql);
		if(count($result)>0){
			$t_id=$data["data"]["0"]["t_id"];
			$t_name=$data["data"]["0"]["t_name"];
			$_SESSION["t_id"]=$t_id;//将教师ID存入SESSION中
			$_SESSION["t_name"]=$t_name;//将教师姓名存入SESSION中
			
			setcookie("username",'null',time()-3600,'/');
			$username=trim($_SESSION["t_name"]);
			$password=md5(trim($_POST['t_password']));
			$time = time()+3600;
			$_SESSION["overtime"]=$time;
			setcookie("username",$username,$time,'/');
			
			$this->conn->json(array('status'=>true));//返回json格式数据
		}else{
			$this->conn->json(array('status'=>false));//返回json格式数据
		}
		
	 }


}