<?php

require_once "config.php";

if(!isset($_GET['type'])){
    exit('Je mist wat');
}

echo $_GET['type'];

if($_GET['type'] == 'add')