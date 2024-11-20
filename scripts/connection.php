<?php 
$host_name="142.44.187.111";
$user_name="machakos_transporters";
$password="masaku sevens";
$database="baims";


date_default_timezone_set('Africa/Nairobi');
    $date = date('Y-m-d');
    $time = date('H:i:s a');

    

    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    if (mysqli_connect_errno())
    {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    
    function escapeString($string)
    {
      global $connect;
      $final=mysqli_real_escape_string ( $connect ,  $string );
      return $final;
    }

    function getUserName($id)
{
  global $connect;
  $res=mysqli_query($connect,"SELECT name FROM user WHERE id='$id' ");
  $row=mysqli_fetch_array($res);
  $name=$row['name'];
  return $name;

}

    ?>
