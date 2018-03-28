<?php

require_once "config.php";

// checken of type bestaat
if(!isset($_GET['type'])){
    exit('Je mist wat');
}

// checken of type gelijk is aan add
if($_GET['type'] == 'add')
{
    // checken of cars bestaat
     if(!isset($_GET['cars']))
     {
         exit('cars missing');
     }

     // date types aangeven
     $hour = date('H');
     $day = date('d');
     $month = date('m');
     $year = date('Y');
     $cars = $_GET['cars']; // de value van cars definieren in de variabele cars


     // we kijken of rijen bestaan met dit uur, dag, maand en jaar
     $queryCheck = "SELECT * FROM api WHERE hour=:hour AND day=:day AND month=:month AND year=:year LIMIT 1";
     $check = $db->prepare($queryCheck);
     $check->execute([
         ':hour' => $hour,
         ':day' => $day,
         ':month' => $month,
         ':year' => $year,
     ]);

     // kijken of de rijen bestaan
     if($check->rowCount() == 0){
         // er zijn geen rijen gevonden
         $query = 'INSERT INTO api (hour, day, month, year, cars)
              VALUES (:hour,:day, :month, :year, :cars )
              ';

         $insert = $db->prepare($query);
         $insert->execute([
             ':hour' => $hour,
             ':day' => $day,
             ':month' => $month,
             ':year' => $year,
             ':cars' => $cars
         ]);

         exit("AWESOME!");
     }
     // er is een rij gevonden, we updaten deze rij
    else{
        $query = 'UPDATE api  SET cars = (cars+:cars) WHERE hour=:hour AND day=:day AND month=:month AND year=:year LIMIT 1
              ';

        $insert = $db->prepare($query);
        $insert->execute([
            ':hour' => $hour,
            ':day' => $day,
            ':month' => $month,
            ':year' => $year,
            ':cars' => $cars
        ]);
         exit ("ER IS ER AL ÉÉN!!!!!");
    }
}

// else if ($_GET[])