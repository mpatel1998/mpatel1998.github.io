<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
$condition=1;
$res=array();
$sql="select * from ip where ip={$_POST['ip']}";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
  array_push($res,$row);
  $condition=0;
}
if($condition){
  $sql="insert into ip(ip) values ({$_POST['ip']})";
  $result=$conn->query($sql);
}
echo json_encode($sql);
$conn->close();
 ?>
