<?php

session_start();
$con = mysqli_connect('localhost','root','');
mysqli_select_db($con, 'Stone_palace');

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$password = $_POST['user_password'];

$query = "select * from user_info where user_name = '$name'";
$result = mysqli_query($con, $query);
$reg = "insert into user_info(user_name,user_password,user_email) values ('$name','$email','$password')";
musqli_query($con,$reg);

?>