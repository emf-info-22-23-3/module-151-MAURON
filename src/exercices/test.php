<?php
// Connexion à la base de données
$host = 'mysql';
$dbname = 'db_foot';
$username = 'root';
$password = 'root';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Affichage de l'image si le bouton est pressé
if (isset($_GET['view']) && $_GET['view'] == 'image') {
    $sql = "SELECT Photo FROM T_photo WHERE PK_photo = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
   
    if ($row && !empty($row['Photo'])) {
        header("Content-Type: image/jpeg");
        ob_clean();
        flush();
        echo $row['Photo'];
        exit;
    } else {
        echo "Image non trouvée.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afficher une Image</title>
</head>
<body>
    <h2>Cliquer sur le bouton pour afficher l'image</h2>
    <form method="get">
        <button type="submit" name="view" value="Photo">Afficher l'image</button>
    </form>

    <h3>Image :</h3>
    <img src="?view=image" alt="Image non trouvée">
</body>
</html>
