<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
$condition=true;
$res=array();
$sql="select {$_POST['ip']} from ip";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
  array_push($res,$row);
  $condition=false;
}
if($condition){
  $sql="insert into ip(ip) values ({$_POST['ip']})";
  $result=$conn->query($sql);
}
echo json_encode($condition);
$conn->close();
 ?>
