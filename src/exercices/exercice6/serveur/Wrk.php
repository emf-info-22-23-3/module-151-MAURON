<?php

require_once("Equipe.php");
class Wrk
{
    public function getEquipes()
    {
        return [
            new Equipe(1, 'Gotteron'),
            new Equipe(2, 'SC Bern'),
            new Equipe(3, 'Fribourg-Gottéron'),
            new Equipe(4, 'HC Davos')
        ];
    }
}
?>
