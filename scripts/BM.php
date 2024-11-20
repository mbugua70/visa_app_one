<?php
require("connection.php");
$output=array();
$success=array();
$failure=array();
$sql= "";

$ba_name=mysqli_real_escape_string ( $connect ,$_POST['ba_name']);
$ba_phone=mysqli_real_escape_string ( $connect ,$_POST['ba_phone']);
$ba_region=mysqli_real_escape_string ( $connect ,$_POST['ba_region']);
$place=mysqli_real_escape_string ( $connect ,$_POST['project']);

switch ($place) {
    case 'SUMMARY':
        $project="7";

    $sub_1_1=mysqli_real_escape_string ( $connect ,$_POST['sub_1_1']);
    $sub_1_2=mysqli_real_escape_string ( $connect ,$_POST['sub_1_2']);
    $sub_1_3=mysqli_real_escape_string ( $connect ,$_POST['sub_1_3']);
    $sub_1_4=mysqli_real_escape_string ( $connect ,$_POST['sub_1_4']);
    $sub_1_5=mysqli_real_escape_string ( $connect ,$_POST['sub_1_5']);
    $sub_1_6=mysqli_real_escape_string ( $connect ,$_POST['sub_1_6']);
    $sub_1_7=mysqli_real_escape_string ( $connect ,$_POST['sub_1_7']);
    $sub_1_8=mysqli_real_escape_string ( $connect ,$_POST['sub_1_8']);
    $sub_1_9=mysqli_real_escape_string ( $connect ,$_POST['sub_1_9']);  
    $sub_1_10=mysqli_real_escape_string ( $connect ,$_POST['sub_1_10']);
    $sub_1_11=mysqli_real_escape_string ( $connect ,$_POST['sub_1_11']);
   
    $sql="";
    $sql=" INSERT INTO `airtel_combined`( `ba_name`, `ba_phone`, `ba_region`, `sub_1_1`, `sub_1_2`, `sub_1_3`, `sub_1_4`, `sub_1_5`, `sub_1_6`, `sub_1_7`, `sub_1_8`, `sub_1_9`, `sub_1_10`, `sub_1_11`,`project`) VALUES ( '$ba_name', '$ba_phone', '$ba_region', '$sub_1_1', '$sub_1_2', '$sub_1_3', '$sub_1_4', '$sub_1_5', '$sub_1_6', '$sub_1_7', '$sub_1_8', '$sub_1_9', '$sub_1_10', '$sub_1_11',  '$project')  ";
    
    break;  


    case 'RECOMMENDATIONS':

        $project="8";

        $sub_1_1=mysqli_real_escape_string ( $connect ,$_POST['sub_1_1']);
        $sub_1_2=mysqli_real_escape_string ( $connect ,$_POST['sub_1_2']);
        $sub_1_3=mysqli_real_escape_string ( $connect ,$_POST['sub_1_3']);
        $sub_1_4=mysqli_real_escape_string ( $connect ,$_POST['sub_1_4']);
        //  $sql="";
        $sql=" INSERT INTO `airtel_combined`( `ba_name`, `ba_phone`, `ba_region`, `sub_1_1`, `sub_1_2`, `sub_1_3`, `sub_1_4`,`project` ) VALUES ( '$ba_name', '$ba_phone', '$ba_region', '$sub_1_1', '$sub_1_2', '$sub_1_3', '$sub_1_4', '$project')  ";
    
        break;  

                
        
    case 'MPESA':

        $project="9";

        $sub_1_1=mysqli_real_escape_string ( $connect ,$_POST['sub_1_1']);
        $sub_1_2=mysqli_real_escape_string ( $connect ,$_POST['sub_1_2']);
        $sub_1_3=mysqli_real_escape_string ( $connect ,$_POST['sub_1_3']);
        $sub_1_4=mysqli_real_escape_string ( $connect ,$_POST['sub_1_4']);
        $sub_1_5=mysqli_real_escape_string ( $connect ,$_POST['sub_1_5']);
        $sub_1_6=mysqli_real_escape_string ( $connect ,$_POST['sub_1_6']);
        $sub_1_7=mysqli_real_escape_string ( $connect ,$_POST['sub_1_7']);
        $sub_1_8=mysqli_real_escape_string ( $connect ,$_POST['sub_1_8']);
        $sub_1_9=mysqli_real_escape_string ( $connect ,$_POST['sub_1_9']);  
        $sub_1_10=mysqli_real_escape_string ( $connect ,$_POST['sub_1_10']);
        $sub_1_11=mysqli_real_escape_string ( $connect ,$_POST['sub_1_11']);
        $sub_1_12=mysqli_real_escape_string ( $connect ,$_POST['sub_1_12']);
        $sub_1_13=mysqli_real_escape_string ( $connect ,$_POST['sub_1_13']);
        $sub_1_14=mysqli_real_escape_string ( $connect ,$_POST['sub_1_14']);
        $sub_1_15=mysqli_real_escape_string ( $connect ,$_POST['sub_1_15']); 
        $sub_1_16=mysqli_real_escape_string ( $connect ,$_POST['sub_1_16']);
        $sub_1_17=mysqli_real_escape_string ( $connect ,$_POST['sub_1_17']);
        $sub_1_18=mysqli_real_escape_string ( $connect ,$_POST['sub_1_18']);
        $sub_1_19=mysqli_real_escape_string ( $connect ,$_POST['sub_1_19']);
        $sub_1_20=mysqli_real_escape_string ( $connect ,$_POST['sub_1_20']);
        $sub_1_21=mysqli_real_escape_string ( $connect ,$_POST['sub_1_21']);
        $sub_1_22=mysqli_real_escape_string ( $connect ,$_POST['sub_1_22']);
        $sub_1_23=mysqli_real_escape_string ( $connect ,$_POST['sub_1_23']);
        $sub_1_24=mysqli_real_escape_string ( $connect ,$_POST['sub_1_24']);
        $sub_1_25=mysqli_real_escape_string ( $connect ,$_POST['sub_1_25']);
        $sub_1_26=mysqli_real_escape_string ( $connect ,$_POST['sub_1_26']);
        $sub_1_27=mysqli_real_escape_string ( $connect ,$_POST['sub_1_27']);
        $sub_1_28=mysqli_real_escape_string ( $connect ,$_POST['sub_1_28']);
        $sub_1_29=mysqli_real_escape_string ( $connect ,$_POST['sub_1_29']);
        $sub_1_30=mysqli_real_escape_string ( $connect ,$_POST['sub_1_30']);
        $sub_1_31=mysqli_real_escape_string ( $connect ,$_POST['sub_1_31']);
        $sub_1_32=mysqli_real_escape_string ( $connect ,$_POST['sub_1_32']);
        $sub_1_33=mysqli_real_escape_string ( $connect ,$_POST['sub_1_33']);
        $sub_1_34=mysqli_real_escape_string ( $connect ,$_POST['sub_1_34']);

        $sql=" INSERT INTO `airtel_combined`( `ba_name`, `ba_phone`, `ba_region`, `sub_1_1`, `sub_1_2`, `sub_1_3`, `sub_1_4`, `sub_1_5`, `sub_1_6`, `sub_1_7`, `sub_1_8`, `sub_1_9`, `sub_1_10`, `sub_1_11`, `sub_1_12`, `sub_1_13`, `sub_1_14`, `sub_1_15`, `sub_1_16`, `sub_1_17`, `sub_1_18`, `sub_1_19`, `sub_1_20`, `sub_1_21`, `sub_1_22`, `sub_1_23`, `sub_1_24`, `sub_1_25`, `sub_1_26`, `sub_1_27`, `sub_1_28`, `sub_1_29`, `sub_1_30`, `sub_1_31`, `sub_1_32`, `sub_1_33`, `sub_1_34`, `project`)  VALUES ( '$ba_name', '$ba_phone', '$ba_region', '$sub_1_1', '$sub_1_2', '$sub_1_3', '$sub_1_4', '$sub_1_5', '$sub_1_6', '$sub_1_7', '$sub_1_8', '$sub_1_9', '$sub_1_10', '$sub_1_11', '$sub_1_12', '$sub_1_13', '$sub_1_14', '$sub_1_15', '$sub_1_16', '$sub_1_17', '$sub_1_18', '$sub_1_19', '$sub_1_20', '$sub_1_21', '$sub_1_22', '$sub_1_23', '$sub_1_24', '$sub_1_25', '$sub_1_26', '$sub_1_27', '$sub_1_28', '$sub_1_29', '$sub_1_30', '$sub_1_31', '$sub_1_32', '$sub_1_33', '$sub_1_34', '$project') ";
        break; 





        
    case 'HALOPESA':

        $project="10";

        $sub_1_1=mysqli_real_escape_string ( $connect ,$_POST['sub_1_1']);
        $sub_1_2=mysqli_real_escape_string ( $connect ,$_POST['sub_1_2']);
        $sub_1_3=mysqli_real_escape_string ( $connect ,$_POST['sub_1_3']);
        $sub_1_4=mysqli_real_escape_string ( $connect ,$_POST['sub_1_4']);
        $sub_1_5=mysqli_real_escape_string ( $connect ,$_POST['sub_1_5']);
        $sub_1_6=mysqli_real_escape_string ( $connect ,$_POST['sub_1_6']);
        $sub_1_7=mysqli_real_escape_string ( $connect ,$_POST['sub_1_7']);
        $sub_1_8=mysqli_real_escape_string ( $connect ,$_POST['sub_1_8']);
        $sub_1_9=mysqli_real_escape_string ( $connect ,$_POST['sub_1_9']);  
        $sub_1_10=mysqli_real_escape_string ( $connect ,$_POST['sub_1_10']);
        $sub_1_11=mysqli_real_escape_string ( $connect ,$_POST['sub_1_11']);
        $sub_1_12=mysqli_real_escape_string ( $connect ,$_POST['sub_1_12']);
        $sub_1_13=mysqli_real_escape_string ( $connect ,$_POST['sub_1_13']);
        $sub_1_14=mysqli_real_escape_string ( $connect ,$_POST['sub_1_14']);
        $sub_1_15=mysqli_real_escape_string ( $connect ,$_POST['sub_1_15']); 
        $sub_1_16=mysqli_real_escape_string ( $connect ,$_POST['sub_1_16']);
        $sub_1_17=mysqli_real_escape_string ( $connect ,$_POST['sub_1_17']);
        $sub_1_18=mysqli_real_escape_string ( $connect ,$_POST['sub_1_18']);
        $sub_1_19=mysqli_real_escape_string ( $connect ,$_POST['sub_1_19']);
        $sub_1_20=mysqli_real_escape_string ( $connect ,$_POST['sub_1_20']);
        $sub_1_21=mysqli_real_escape_string ( $connect ,$_POST['sub_1_21']);
        $sub_1_22=mysqli_real_escape_string ( $connect ,$_POST['sub_1_22']);
        $sub_1_23=mysqli_real_escape_string ( $connect ,$_POST['sub_1_23']);
        $sub_1_24=mysqli_real_escape_string ( $connect ,$_POST['sub_1_24']);
        $sub_1_25=mysqli_real_escape_string ( $connect ,$_POST['sub_1_25']);
        $sub_1_26=mysqli_real_escape_string ( $connect ,$_POST['sub_1_26']);
        $sub_1_27=mysqli_real_escape_string ( $connect ,$_POST['sub_1_27']);
        $sub_1_28=mysqli_real_escape_string ( $connect ,$_POST['sub_1_28']);
        $sub_1_29=mysqli_real_escape_string ( $connect ,$_POST['sub_1_29']);
        $sub_1_30=mysqli_real_escape_string ( $connect ,$_POST['sub_1_30']);
        $sub_1_31=mysqli_real_escape_string ( $connect ,$_POST['sub_1_31']);
        $sub_1_32=mysqli_real_escape_string ( $connect ,$_POST['sub_1_32']);
        $sub_1_33=mysqli_real_escape_string ( $connect ,$_POST['sub_1_33']);
        $sub_1_34=mysqli_real_escape_string ( $connect ,$_POST['sub_1_34']);

        $sql=" INSERT INTO `airtel_combined`( `ba_name`, `ba_phone`, `ba_region`, `sub_1_1`, `sub_1_2`, `sub_1_3`, `sub_1_4`, `sub_1_5`, `sub_1_6`, `sub_1_7`, `sub_1_8`, `sub_1_9`, `sub_1_10`, `sub_1_11`, `sub_1_12`, `sub_1_13`, `sub_1_14`, `sub_1_15`, `sub_1_16`, `sub_1_17`, `sub_1_18`, `sub_1_19`, `sub_1_20`, `sub_1_21`, `sub_1_22`, `sub_1_23`, `sub_1_24`, `sub_1_25`, `sub_1_26`, `sub_1_27`, `sub_1_28`, `sub_1_29`, `sub_1_30`, `sub_1_31`, `sub_1_32`, `sub_1_33`, `sub_1_34`, `project`)  VALUES ( '$ba_name', '$ba_phone', '$ba_region', '$sub_1_1', '$sub_1_2', '$sub_1_3', '$sub_1_4', '$sub_1_5', '$sub_1_6', '$sub_1_7', '$sub_1_8', '$sub_1_9', '$sub_1_10', '$sub_1_11', '$sub_1_12', '$sub_1_13', '$sub_1_14', '$sub_1_15', '$sub_1_16', '$sub_1_17', '$sub_1_18', '$sub_1_19', '$sub_1_20', '$sub_1_21', '$sub_1_22', '$sub_1_23', '$sub_1_24', '$sub_1_25', '$sub_1_26', '$sub_1_27', '$sub_1_28', '$sub_1_29', '$sub_1_30', '$sub_1_31', '$sub_1_32', '$sub_1_33', '$sub_1_34', '$project') ";
        break; 

        
    case 'TIGO':

        $project="11";

        $sub_1_1=mysqli_real_escape_string ( $connect ,$_POST['sub_1_1']);
        $sub_1_2=mysqli_real_escape_string ( $connect ,$_POST['sub_1_2']);
        $sub_1_3=mysqli_real_escape_string ( $connect ,$_POST['sub_1_3']);
        $sub_1_4=mysqli_real_escape_string ( $connect ,$_POST['sub_1_4']);
        $sub_1_5=mysqli_real_escape_string ( $connect ,$_POST['sub_1_5']);
        $sub_1_6=mysqli_real_escape_string ( $connect ,$_POST['sub_1_6']);
        $sub_1_7=mysqli_real_escape_string ( $connect ,$_POST['sub_1_7']);
        $sub_1_8=mysqli_real_escape_string ( $connect ,$_POST['sub_1_8']);
        $sub_1_9=mysqli_real_escape_string ( $connect ,$_POST['sub_1_9']);  
        $sub_1_10=mysqli_real_escape_string ( $connect ,$_POST['sub_1_10']);
        $sub_1_11=mysqli_real_escape_string ( $connect ,$_POST['sub_1_11']);
        $sub_1_12=mysqli_real_escape_string ( $connect ,$_POST['sub_1_12']);
        $sub_1_13=mysqli_real_escape_string ( $connect ,$_POST['sub_1_13']);
        $sub_1_14=mysqli_real_escape_string ( $connect ,$_POST['sub_1_14']);
        $sub_1_15=mysqli_real_escape_string ( $connect ,$_POST['sub_1_15']); 
        $sub_1_16=mysqli_real_escape_string ( $connect ,$_POST['sub_1_16']);
        $sub_1_17=mysqli_real_escape_string ( $connect ,$_POST['sub_1_17']);
        $sub_1_18=mysqli_real_escape_string ( $connect ,$_POST['sub_1_18']);
        $sub_1_19=mysqli_real_escape_string ( $connect ,$_POST['sub_1_19']);
        $sub_1_20=mysqli_real_escape_string ( $connect ,$_POST['sub_1_20']);
        $sub_1_21=mysqli_real_escape_string ( $connect ,$_POST['sub_1_21']);
        $sub_1_22=mysqli_real_escape_string ( $connect ,$_POST['sub_1_22']);
        $sub_1_23=mysqli_real_escape_string ( $connect ,$_POST['sub_1_23']);
        $sub_1_24=mysqli_real_escape_string ( $connect ,$_POST['sub_1_24']);
        $sub_1_25=mysqli_real_escape_string ( $connect ,$_POST['sub_1_25']);
        $sub_1_26=mysqli_real_escape_string ( $connect ,$_POST['sub_1_26']);
        $sub_1_27=mysqli_real_escape_string ( $connect ,$_POST['sub_1_27']);
        $sub_1_28=mysqli_real_escape_string ( $connect ,$_POST['sub_1_28']);
        $sub_1_29=mysqli_real_escape_string ( $connect ,$_POST['sub_1_29']);
        $sub_1_30=mysqli_real_escape_string ( $connect ,$_POST['sub_1_30']);
        $sub_1_31=mysqli_real_escape_string ( $connect ,$_POST['sub_1_31']);
        $sub_1_32=mysqli_real_escape_string ( $connect ,$_POST['sub_1_32']);
        $sub_1_33=mysqli_real_escape_string ( $connect ,$_POST['sub_1_33']);
        $sub_1_34=mysqli_real_escape_string ( $connect ,$_POST['sub_1_34']);

        $sql=" INSERT INTO `airtel_combined`( `ba_name`, `ba_phone`, `ba_region`, `sub_1_1`, `sub_1_2`, `sub_1_3`, `sub_1_4`, `sub_1_5`, `sub_1_6`, `sub_1_7`, `sub_1_8`, `sub_1_9`, `sub_1_10`, `sub_1_11`, `sub_1_12`, `sub_1_13`, `sub_1_14`, `sub_1_15`, `sub_1_16`, `sub_1_17`, `sub_1_18`, `sub_1_19`, `sub_1_20`, `sub_1_21`, `sub_1_22`, `sub_1_23`, `sub_1_24`, `sub_1_25`, `sub_1_26`, `sub_1_27`, `sub_1_28`, `sub_1_29`, `sub_1_30`, `sub_1_31`, `sub_1_32`, `sub_1_33`, `sub_1_34`, `project`)  VALUES ( '$ba_name', '$ba_phone', '$ba_region', '$sub_1_1', '$sub_1_2', '$sub_1_3', '$sub_1_4', '$sub_1_5', '$sub_1_6', '$sub_1_7', '$sub_1_8', '$sub_1_9', '$sub_1_10', '$sub_1_11', '$sub_1_12', '$sub_1_13', '$sub_1_14', '$sub_1_15', '$sub_1_16', '$sub_1_17', '$sub_1_18', '$sub_1_19', '$sub_1_20', '$sub_1_21', '$sub_1_22', '$sub_1_23', '$sub_1_24', '$sub_1_25', '$sub_1_26', '$sub_1_27', '$sub_1_28', '$sub_1_29', '$sub_1_30', '$sub_1_31', '$sub_1_32', '$sub_1_33', '$sub_1_34', '$project') ";
        break; 


        
    

    case 'T-PESA':

        $project="12";

        $sub_1_1=mysqli_real_escape_string ( $connect ,$_POST['sub_1_1']);
        $sub_1_2=mysqli_real_escape_string ( $connect ,$_POST['sub_1_2']);
        $sub_1_3=mysqli_real_escape_string ( $connect ,$_POST['sub_1_3']);
        $sub_1_4=mysqli_real_escape_string ( $connect ,$_POST['sub_1_4']);
        $sub_1_5=mysqli_real_escape_string ( $connect ,$_POST['sub_1_5']);
        $sub_1_6=mysqli_real_escape_string ( $connect ,$_POST['sub_1_6']);
        $sub_1_7=mysqli_real_escape_string ( $connect ,$_POST['sub_1_7']);
        $sub_1_8=mysqli_real_escape_string ( $connect ,$_POST['sub_1_8']);
        $sub_1_9=mysqli_real_escape_string ( $connect ,$_POST['sub_1_9']);  
        $sub_1_10=mysqli_real_escape_string ( $connect ,$_POST['sub_1_10']);
        $sub_1_11=mysqli_real_escape_string ( $connect ,$_POST['sub_1_11']);
        $sub_1_12=mysqli_real_escape_string ( $connect ,$_POST['sub_1_12']);
        $sub_1_13=mysqli_real_escape_string ( $connect ,$_POST['sub_1_13']);
        $sub_1_14=mysqli_real_escape_string ( $connect ,$_POST['sub_1_14']);
        $sub_1_15=mysqli_real_escape_string ( $connect ,$_POST['sub_1_15']); 
        $sub_1_16=mysqli_real_escape_string ( $connect ,$_POST['sub_1_16']);
        $sub_1_17=mysqli_real_escape_string ( $connect ,$_POST['sub_1_17']);
        $sub_1_18=mysqli_real_escape_string ( $connect ,$_POST['sub_1_18']);
        $sub_1_19=mysqli_real_escape_string ( $connect ,$_POST['sub_1_19']);
        $sub_1_20=mysqli_real_escape_string ( $connect ,$_POST['sub_1_20']);
        $sub_1_21=mysqli_real_escape_string ( $connect ,$_POST['sub_1_21']);
        $sub_1_22=mysqli_real_escape_string ( $connect ,$_POST['sub_1_22']);
        $sub_1_23=mysqli_real_escape_string ( $connect ,$_POST['sub_1_23']);
        $sub_1_24=mysqli_real_escape_string ( $connect ,$_POST['sub_1_24']);
        $sub_1_25=mysqli_real_escape_string ( $connect ,$_POST['sub_1_25']);
        $sub_1_26=mysqli_real_escape_string ( $connect ,$_POST['sub_1_26']);
        $sub_1_27=mysqli_real_escape_string ( $connect ,$_POST['sub_1_27']);
        $sub_1_28=mysqli_real_escape_string ( $connect ,$_POST['sub_1_28']);
        $sub_1_29=mysqli_real_escape_string ( $connect ,$_POST['sub_1_29']);
        $sub_1_30=mysqli_real_escape_string ( $connect ,$_POST['sub_1_30']);
        $sub_1_31=mysqli_real_escape_string ( $connect ,$_POST['sub_1_31']);
        $sub_1_32=mysqli_real_escape_string ( $connect ,$_POST['sub_1_32']);
        $sub_1_33=mysqli_real_escape_string ( $connect ,$_POST['sub_1_33']);
        $sub_1_34=mysqli_real_escape_string ( $connect ,$_POST['sub_1_34']);

        $sql=" INSERT INTO `airtel_combined`( `ba_name`, `ba_phone`, `ba_region`, `sub_1_1`, `sub_1_2`, `sub_1_3`, `sub_1_4`, `sub_1_5`, `sub_1_6`, `sub_1_7`, `sub_1_8`, `sub_1_9`, `sub_1_10`, `sub_1_11`, `sub_1_12`, `sub_1_13`, `sub_1_14`, `sub_1_15`, `sub_1_16`, `sub_1_17`, `sub_1_18`, `sub_1_19`, `sub_1_20`, `sub_1_21`, `sub_1_22`, `sub_1_23`, `sub_1_24`, `sub_1_25`, `sub_1_26`, `sub_1_27`, `sub_1_28`, `sub_1_29`, `sub_1_30`, `sub_1_31`, `sub_1_32`, `sub_1_33`, `sub_1_34`, `project`)  VALUES ( '$ba_name', '$ba_phone', '$ba_region', '$sub_1_1', '$sub_1_2', '$sub_1_3', '$sub_1_4', '$sub_1_5', '$sub_1_6', '$sub_1_7', '$sub_1_8', '$sub_1_9', '$sub_1_10', '$sub_1_11', '$sub_1_12', '$sub_1_13', '$sub_1_14', '$sub_1_15', '$sub_1_16', '$sub_1_17', '$sub_1_18', '$sub_1_19', '$sub_1_20', '$sub_1_21', '$sub_1_22', '$sub_1_23', '$sub_1_24', '$sub_1_25', '$sub_1_26', '$sub_1_27', '$sub_1_28', '$sub_1_29', '$sub_1_30', '$sub_1_31', '$sub_1_32', '$sub_1_33', '$sub_1_34', '$project') ";
        break; 
        


      
    


    } 

      mysqli_query($connect,$sql) or die(mysqli_error($connect));


        if (mysqli_affected_rows($connect)>0) 
        {
        $output['response']="success";  
        }
        else
        {
        $output['response']="fail";
        
        }






$output['success']=$success;
$output['failure']=$failure;
$json = json_encode($output);

    echo $json;
exit;


         
        







?>