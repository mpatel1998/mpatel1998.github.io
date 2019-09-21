<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
$condition=1;
$res=array();
$sql="select * from ip where uuid='{$_POST['uuid']}'";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
  array_push($res,$row);
  $condition=0;
}
if($condition){
  $sql="insert into ip(uuid) values ('{$_POST['uuid']}')";
  $result=$conn->query($sql);
}
echo json_encode($res);
$conn->close();
 ?>
