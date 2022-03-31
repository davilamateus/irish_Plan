<?php

include "db.php";

$action = $_GET['action'];


if($action  == 'get') { //existe source?
    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id_user=$decode['id_user'];

    $sql="SELECT * FROM to_do_list WHERE id_user='$id_user'ORDER BY `to_do_list`.`id` DESC";
    $run_sql=mysqli_query($conn,$sql);
    $output=[];
    if(mysqli_num_rows($run_sql) > 0){
        while($row=mysqli_fetch_assoc($run_sql)){
            $output[]=$row;
        }
    }
    echo json_encode($output);
    } 


    if($action == 'update'){
        $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id=$decode['id'];
    $status=$decode['status'];
    
    $sql="UPDATE to_do_list SET status='{$status}' WHERE id='{$id}'";
    $run_sql=mysqli_query($conn,$sql);
    
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"To do list Update Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }
    }

if($action  == 'delete'){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id=$decode['id'];

    $sql="DELETE  FROM to_do_list WHERE id='{$id}'";
    $run_sql=mysqli_query($conn,$sql);
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"To do list Delete Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }

}

if($action == 'add'){
    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id_user=$decode["id_user"];
    $title=$decode["title"];
      


    $sql="INSERT INTO `to_do_list` (id,id_user,title,status) VALUES (null,'{$id_user}','{$title}','no-comply')";
    $run_sql=mysqli_query($conn,$sql);
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"To do list Add Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }
}
