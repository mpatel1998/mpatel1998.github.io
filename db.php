<?php
$conn=mysqli_connect("mysql1.gear.host","contest","Lo4kK51_-Y91","contest");
if (mysqli_connect_errno()) {

  printf('connect failed');
}
$sql="select {$_POST['name']} from contest.cont";
$result=mysqli_query($conn,$sql);
echo json_encode($result);
$conn->close();
 ?>
