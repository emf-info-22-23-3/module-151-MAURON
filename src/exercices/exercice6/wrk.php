<?php
class Equipes
{
  private $equipes;
  public function __construct()
  {
    $this->equipes = array('Gotteron', 'SC Bern', 'Fribourg-Gottéron', 'HC Davos');
  }

  public function getEquipes()
  {
    return $this->equipes;
  }
}
?>