<?php
include("db.php");

$action = $_GET['action'];

if($action == 'verific'){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $session=$decode["session"];
    $id_user=$decode["id_user"];
      
    $query = "SELECT * FROM sessions WHERE session= '$session' AND id_user = '$id_user' ";
    
    $run_sql=mysqli_query($conn,$query);
    $output=[];
    if(mysqli_num_rows($run_sql) > 0){

        $input=file_get_contents("php://input");
        $decode=json_decode($input,true);
        
        $options = "SELECT*FROM users_options WHERE id_user= '$id_user' ";
    
        $run_sql=mysqli_query($conn,$options);
        $output=[];
        if(mysqli_num_rows($run_sql) > 0){
            while($row=mysqli_fetch_assoc($run_sql)){
                $output=$row;
            }
        }
        echo json_encode($output);
    }else{
        echo "false";
    }
    
    }

if($action == 'login'){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);

    $email=$decode["email"];
    $password=$decode["password"];
    $session = password_hash($email, PASSWORD_DEFAULT);

    $query = "SELECT password, id FROM users WHERE email= '$email' ";

    $verific_sql=mysqli_query($conn,$query);
    $output=[];
    if(mysqli_num_rows($verific_sql) > 0){
        while($row=mysqli_fetch_assoc($verific_sql)){
            $output = $row;
            
        }
        $passwordCript = $output['password'];
        $passwordCriptVerifc = password_verify($password, $passwordCript);
        if($passwordCriptVerifc == 1){
            $idUser = $output['id'];
            $sql="INSERT INTO `sessions` (id,id_user,session) VALUES (null,'{$output['id']}','{$session}')";
            $session_sql=mysqli_query($conn,$sql);
            echo json_encode([$idUser, $session]);

        } else{ echo 'false';}
    } else {echo 'false';}

}




// insert user
if($action == 'insertUser'){

    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $email=$decode["email"];
    $password=$decode["password"];
    $first_name=$decode["first_name"];
    $last_name=$decode["last_name"];
    $passwordCript = password_hash($password, PASSWORD_DEFAULT);

    $query = "SELECT email FROM users WHERE email= '$email' ";


    $verific_sql=mysqli_query($conn,$query);
    $output=[];
    if(mysqli_num_rows($verific_sql) > 0){

        echo json_encode('emailFalse');

    } else{
    $sql="INSERT INTO `users` (id,email,first_name,last_name,password) VALUES (null,'{$email}','{$first_name}','{$last_name}','{$passwordCript}')";
    $run_sql=mysqli_query($conn,$sql);
    
        if($run_sql){
        $query = "SELECT id FROM users WHERE email= '$email' ";
        $verific_sql=mysqli_query($conn,$query);
        if(mysqli_num_rows($verific_sql) > 0){
             while($row=mysqli_fetch_assoc($verific_sql)){
                $output = $row;
            }
            $iduser = json_encode($output['id']);
            $time = (time()+15552000)*1000;

            $sql2="INSERT INTO `users_options` (`id`, `id_user`, `date_travel`) VALUES (NULL, $iduser,$time);";
            $run_sql2=mysqli_query($conn,$sql2);


            
            $sql3="INSERT INTO `to_do_list` (`id`, `id_user`, `title`, `status`) VALUES 
            (NULL, $iduser, 'Buy EUROS', ''),
            (NULL, $iduser, 'Schedule GRNB', ''),  
            (NULL, $iduser, 'Go to the doctor', ''), 
            (NULL, $iduser, 'Go to the dentist', ''), 
            (NULL, $iduser, 'Buy travel health insurance', ''), 
            (NULL, $iduser, 'Buy english course', ''), 
            (NULL, $iduser, 'Get passport', '')";
            $run_sql3=mysqli_query($conn,$sql3);
    
        echo json_encode(["success"=>true,"message"=>"User Add Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }

    }
}
}


if($action == 'userData'){


    $input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id_user=$decode["id_user"];
      
    
    $query = "SELECT first_name, last_name, email, password, id FROM users WHERE  id = '$id_user' ";
    $verific_sql=mysqli_query($conn,$query);
    $output=[];
    if(mysqli_num_rows($verific_sql) > 0){
        while($row=mysqli_fetch_assoc($verific_sql)){
            $output = $row;}
  
    }
    echo json_encode([$output]);

}  
    
if($action == 'photoUser'){

    echo'<prev';
    print_r($_FILES);   

}