<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {
     die("Connection to database failed: " . $conn->connect_error);
}
if($_POST['count']){
$sql="UPDATE cont SET {$_POST['name']}={$_POST['name']}+1";
} else{
  $sql="UPDATE cont SET {$_POST['name']}={$_POST['name']}-1";
}
$result=$conn->query($sql);
echo json_encode($sql);
$conn->close();
 ?>
