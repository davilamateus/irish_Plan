<?php

include "db.php";

$id_user = $_GET['id_user'];


$sql="SELECT * FROM users_options WHERE id_user='$id_user'";
$run_sql=mysqli_query($conn,$sql);
$output=[];
if(mysqli_num_rows($run_sql) > 0){
    while($row=mysqli_fetch_assoc($run_sql)){
        $output[]=$row;
    }
}
echo json_encode($output);
?>