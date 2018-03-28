<?php

$db_host = "46.101.251.100";
$db_username = "Jasper_cle3";
$db_password = "IQAQsfJr3P";
$db_database = "Jasper_cle3";

try {
    $db = new PDO('mysql:host='.$db_host.';dbname='. $db_database, $db_username, $db_password);

} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}