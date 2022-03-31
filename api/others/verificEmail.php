<?php

include "db.php";

$email = $_GET['email'];


$sql="SELECT * FROM users WHERE email='$email'";
$run_sql=mysqli_query($conn,$sql);
$output=[];
if(mysqli_num_rows($run_sql) > 0){
    while($row=mysqli_fetch_assoc($run_sql)){
        $output[]=$row;
    }
}else{
    $output= false;
}
echo json_encode($output);
// print_r($output);
?>