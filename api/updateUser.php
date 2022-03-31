
<?php

include "db.php";
$action = $_GET['action'];


if($action == 'update'){
$input=file_get_contents("php://input");
    $decode=json_decode($input,true);
    
    $id=$decode['id'];
    $email=$decode['email'];
    $planning=$decode['planning'];
    $city=$decode['city'];
    $travel_in=$decode['travel_in'];
    
    
    
    $sql="UPDATE users SET email='{$email}' WHERE id='{$id}'";
    $run_sql=mysqli_query($conn,$sql);
    
    
    if($run_sql){
        echo json_encode(["success"=>true,"message"=>"Student Update Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }

    $sqlOptions="UPDATE users_options SET finance_goals='{$planning}', city='{$city}', date_travel='{$travel_in}' WHERE id_user='{$id}'";
    $run_sqlOptions=mysqli_query($conn,$sqlOptions);
    
    
    if($run_sqlOptions){
        echo json_encode(["success"=>true,"message"=>"Student Update Succcessfully"]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Server Problem"]);
    }
}

if($action == 'verificPassword'){
    $input=file_get_contents("php://input");
        $decode=json_decode($input,true);
        
        $id=$decode['id'];
        $password=$decode['password'];
        $new_password=$decode['new_password'];

        $new_passwordCript = password_hash($new_password, PASSWORD_DEFAULT);
        
        
        $verificPassword = "SELECT password FROM users WHERE id= '$id' ";
        
        
        $run_sql=mysqli_query($conn,$verificPassword);
        $output='';
        if(mysqli_num_rows($run_sql) > 0){
            while($row=mysqli_fetch_assoc($run_sql)){
                
                $output = $row;
                
                
            }
            
            $passwordCript = $output['password'];
            $passwordCritpVerific = password_verify($password, $passwordCript);

            if($passwordCritpVerific == 1 ){
 
                $sql="UPDATE users SET password='{$new_passwordCript}' WHERE id='{$id}'";
                $run_sql=mysqli_query($conn,$sql);
                
                
                if($run_sql){
                    echo json_encode(["success"=>true,"message"=>"Student Update Succcessfully"]);
                }else{
                    echo json_encode(["success"=>false,"message"=>"Server Problem"]);
                }


            }  
            else{ 
                echo 'false';
            }
            
        
    }

    
}




if($action == 'updatePhoto'){
        $name = md5($_FILES['file']['name']);
        $id_user =$_GET['id_user'];

        echo $id_user;
        print_r( $_FILES );
        move_uploaded_file($_FILES['file']['tmp_name'], '../assets/img/usersPhotos/'.$name.'.png');

        $sql="UPDATE users_options SET user_img= 'assets/img/usersPhotos/$name.png' WHERE id_user='{$id_user}'";
        $run_sql=mysqli_query($conn,$sql);
        
        
        if($run_sql){
            echo 'true';
        }else{
            echo json_encode(["success"=>false,"message"=>"Server Problem"]);
        }



}