<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {

     die("Connection to database failed: " . $conn->connect_error);
}
$res=array();
$sql="select serena from cont";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
  array_push($res,$row);
}
echo json_encode($res);
$conn->close();
 ?>
