<?php
$conn=new mysqli("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if ($conn->connect_error) {

     die("Connection to database failed: " . $conn->connect_error);
}
$sql="SELECT {$_POST['name']} FROM cont";
$result=$conn->query($sql);
echo json_encode($result);
$conn->close();
 ?>
