<?php
require_once './wrk/Wrk.php';
require_once './beans/Equipe.php';
require_once './ctrl/Ctrl.php';

$wrk = new Ctrl();
$equipes = $wrk->getEquipesXML();
echo $equipes;