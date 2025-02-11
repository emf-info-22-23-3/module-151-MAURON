<?php 
	include_once('workers/PhotoBDManager.php');
	include_once('beans/Photo.php');
        
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$photoBD = new PhotoBDManager();
			echo $photoBD->getInXML();
		}
	}
?>