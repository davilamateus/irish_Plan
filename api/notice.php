<?php

include "db.php";

$action = $_GET['action'];


if($action  == 'get') { //existe source?

    $sql="SELECT * FROM notice  ORDER BY `id` DESC";
    $run_sql=mysqli_query($conn,$sql);
    $output=[];
    if(mysqli_num_rows($run_sql) > 0){
        while($row=mysqli_fetch_assoc($run_sql)){
            $output[]=$row;
        }
    }
    echo json_encode($output);
    } 

