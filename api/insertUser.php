<?php

include 'db.php';

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $email=$decode["email"];
    $password=$decode["password"];
    $first_name=$decode["first_name"];
    $last_name=$decode["last_name"];
      
    $sql="INSERT INTO `users` (id,email,first_name,last_name,password,radio_auto_play,finance_goal) VALUES (null,'{$email}','{$first_name}','{$last_name}','{$password}','true','0')";
    $run_sql=mysqli_query($conn,$sql);
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"User Add Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }
// }

?>