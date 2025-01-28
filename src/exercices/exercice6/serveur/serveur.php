<?php

require_once('Wrk.php');

$wrk = new Wrk();

$equipes = $wrk->getEquipes();
    echo json_encode($equipes);
?>