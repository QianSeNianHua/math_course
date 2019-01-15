<?php
header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求
require_once(realpath(dirname(__FILE__) . "/../") . "/common/connection.php");
error_reporting(0);
  
class KeepPhoto{
	private $conn;
    /*
    *  构造函数，建立数据库连接
    */
    public function __construct() {
        $this->conn = new Connection();
    }

	//查看试题的画板
	//接口参数
	 //$_POST["q_id"];试卷id
	public function lookboard(){
			$q_id=$_POST["q_id"];
			$sql="select * from question where q_id='$q_id'";
			$result=$this->conn->selectBySql($sql);
			header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求  
			$this->conn->json($result);
	}
	
	//保存图片
	//接口参数
	//$_POST["board"];//画板的数据
	public  function base64_image_content(){
		 $imgName = $_POST['imgName'];
		 $base64_image_content=$_POST['imgData'];
		//echo  $base64_image_content;
		//匹配出图片的格式
		if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
			$type = $result[2];
			$time=date("Ymd");
			$dir = iconv("UTF-8", "GBK", "../studentImage/"."$time/");
			//$dir = "test/".$dir;
			if(!file_exists($dir)){
				//检查是否有该文件夹，如果没有就创建，并给予最高权限
				mkdir($dir, 0700,true);
				//echo "创建成功";
			}
			
			$dir = $dir.$imgName.".{$type}";
			if (file_put_contents($dir, base64_decode(str_replace($result[1], '', $base64_image_content)))){
				//echo '/'.$dir;
				echo json_encode(array('result' => true));
			}else{
				//echo "失败";
				echo json_encode(array('result' => false));
			}
		}else{
			//echo "失败了";
			echo json_encode(array('result' => false));
		}
	}
}