<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
$res=array();
$sql="update ip SET chosen='{$_POST['name']}' where uuid='{$_POST['uuid']}'";
$result=$conn->query($sql);
echo json_encode($sql);
$conn->close();
 ?>
