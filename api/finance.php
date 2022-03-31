<?php

include "db.php";

$action = $_GET['action'];

if($action == 'get'){
    $id_user = $_GET['id_user'];
    $sql="SELECT * FROM finance WHERE id_user='$id_user' ORDER BY `finance`.`id` DESC";
    $run_sql=mysqli_query($conn,$sql);
    if(mysqli_num_rows($run_sql) > 0){
        while($row=mysqli_fetch_assoc($run_sql)){
            $output[]=$row;
        }
    }else{
        $output=false;
    }
    echo json_encode($output);
}


if($action == 'update'){
    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);

    $id=$decode['id'];
    $description=$decode['description'];
    $value=$decode['value'];

    $sql="UPDATE finance SET description='{$description}', value='${value}'  WHERE id='{$id}'";
    $run_sql=mysqli_query($conn,$sql);

    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"Finance Update Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }
}

if($action == 'delete'){
    $id=$_GET["id"];
    $sql="DELETE  FROM finance WHERE id='{$id}'";
    $run_sql=mysqli_query($conn,$sql);
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"Finance Delete Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }

}

if($action == 'add'){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id_user=$decode["id_user"];
    $description=$decode["description"];
    $value=$decode["value"];

    $sql="INSERT INTO `finance` (id,id_user,description,value) VALUES (null,'{$id_user}','{$description}','{$value}')";
    $run_sql=mysqli_query($conn,$sql);
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"Finance Add Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }
    
}