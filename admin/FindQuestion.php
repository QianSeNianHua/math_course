<?php
/*
 * Created by PhpStorm.
 * User: dengjunle
 * Date: 2018/12/2
 * Time: 16:59
 * Function:前端查看数据
 */
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
require_once(realpath(dirname(__FILE__) . "/../") . "/common/connection.php");
error_reporting(0);

class FindQuestion{
	private $conn;
    /*
    *  构造函数，建立数据库连接
    */
    public function __construct() {
        $this->conn = new Connection();
    }

	//方法：questiontime()
	//返回值：返回question表里面的部分数据
	//作用：根据时间日期查找相对应的试题
	 public function questiontime(){
		$q_time=$_POST["q_time"];
		//$q_time="2018-12-02";
		if(!isset($_POST['q_time']))
		{	$sql="select * from question where q_time='$q_time' ";
			$result=$this->conn->selectBySql($sql);
			header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
			$this->conn->json($result);//返回json格式数据
		}else{
			header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
			$this->conn->json($result, 404, '添加错误');//返回json格式数据
		}
	 }

	 //方法：allquestion()
	 //返回值：返回question表里面的所有数据
	 //作用：查找全部的试题
	 public function allquestion(){
		$sql="select * from question";
		$result=$this->conn->selectBySql($sql);
		header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
		$num=$this->conn->json($result);//返回json格式数据
	 }

	//推送试题choose
	//$_POST["q_id"]  试卷id
	public function choose() {
		$q_id = $_POST['q_id'];

		header("Access-Control-Allow-Origin: *");

		$sql = "select count(*) as num, q_id from question where q_state=1;";
		$res = $this->conn->selectBySql($sql);

		if((int)$res['data'][0]['num'] > 0) {
			// 试题推送中
			if ((int)$q_id == (int)$res['data'][0]['q_id']) {
				// 结束推送
				$sql = "update question set q_state=0 where q_id={$q_id};";
				$res = $this->conn->updateBySql($sql);

				echo(json_encode(0, JSON_FORCE_OBJECT));
			} else {
				// 提示有其他试题在推送中
				echo(json_encode(2, JSON_FORCE_OBJECT));
			}
		} else {
			// 没有试题处于推送中，则打开试题推送
			$sql = "update question set q_state=1 where q_id={$q_id};";
			$res = $this->conn->updateBySql($sql);

			echo(json_encode(1, JSON_FORCE_OBJECT));
		}
	}

	 //查看试题的画板
	 //$_POST["q_id"];试卷id
	public function lookboard(){
		$q_id=$_POST["q_id"];
		$sql="select * from question where q_id='$q_id'";
		$result=$this->conn->selectBySql($sql);
		header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
		$this->conn->json($result);
	}
}