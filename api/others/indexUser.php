<?php
include("db.php");

$action = $_GET['action'];

if($action == 'verific'){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $email=$decode["email"];
    $id=$decode["id"];
      
    
    $query = "SELECT*FROM users WHERE email= '$email' AND id = '$id' ";
    
    
    $run_sql=mysqli_query($conn,$query);
    $output=[];
    if(mysqli_num_rows($run_sql) > 0){
        while($row=mysqli_fetch_assoc($run_sql)){
            $output=true;
        }
    }else{
        $output =false;
    }
    echo json_encode($output);
    
    }

if($action == 'login'){

$input=file_get_contents("php://input");
$decode=json_decode($input,true);

$email=$decode["email"];
$password=$decode["password"];
  

$query = "SELECT*FROM users WHERE email= '$email' AND password = '$password' ";


$run_sql=mysqli_query($conn,$query);
$output=[];
if(mysqli_num_rows($run_sql) > 0){
    while($row=mysqli_fetch_assoc($run_sql)){
        $output[]=$row;
    }
}else{
    $output =false;
}
echo json_encode($output);

}
// print_r($output);
?>