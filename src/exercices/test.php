<?php
$password = password_hash("emf123", PASSWORD_DEFAULT);

echo "".$password."";
if(password_verify("emf123",'$2y$10$Wy7DUV2Gx0Coiq3TXGUozuz256Q07qattpL.78qLHMgaXo5dD7eB6')){
    echo"true";
}