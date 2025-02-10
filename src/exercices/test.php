<?php
$servername = "mysql";
$username = "root";
$password = "root";
$dbname = "db_foot"; // Remplace par ton nom de base de données

// Connexion à la base de données avec PDO
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// ID de l'image à récupérer, ici 1 pour l'exemple
$image_id = 1; // Si aucun ID n'est passé, on prend l'ID 1 par défaut

// Requête SQL pour récupérer l'image
$sql = "SELECT Nom, Photo FROM T_photo WHERE PK_photo = :id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $image_id, PDO::PARAM_LOB);
$stmt->execute();

// Vérifier si l'image existe
if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $image_data = $row['Photo'];

    // Vérifier que les données de l'image ne sont pas vides
    if (!empty($image_data)) {
        // Définir l'en-tête HTTP pour une image JPEG
        header("Content-Type: image/jpeg");
        echo $image_data; // Afficher les données binaires de l'image
    } else {
        echo "Aucune image trouvée dans la base de données.";
    }
} else {
    echo "Aucune image trouvée pour cet ID.";
}

// Fermer la connexion à la base de données
$conn = null;
?>
