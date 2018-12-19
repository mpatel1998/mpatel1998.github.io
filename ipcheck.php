<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
$condition=0;
$res=array();
$sql="select 1 from chosen where ip={$_POST['ip']}";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
  array_push($res,$row)
  $condition=0;
}
if($condition==0){
  $sql="insert into ip(ip) values ({$_POST['ip']})";
  $result=$conn->query($sql);
  array_push($res,0);
}
echo json_encode($res);
$conn->close();
 ?>
