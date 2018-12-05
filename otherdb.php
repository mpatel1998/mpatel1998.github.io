<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
$sql="UPDATE cont, SET {$_POST['name']}={$_POST['count']}";
echo json_encode($sql);
$result=$conn->query($sql);
echo json_encode($result);
$conn->close();
 ?>
