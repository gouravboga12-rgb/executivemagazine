<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

// DB Config
$host = 'localhost';
$db   = 'u503547278_magazine';
$user = 'u503547278_admin';
$pass = 'Magazine2025!'; 

// Credentials
$admin_email = 'sanjay305090@gmail.com';
$admin_pass  = 'Sanjay@11132'; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "db_fail"]);
    exit;
}

$a = $_GET['action'] ?? '';

if ($a === 'login') {
    $d = json_decode(file_get_contents("php://input"), true);
    if (($d['email'] ?? '') === $admin_email && ($d['password'] ?? '') === $admin_pass) {
        echo json_encode(["success" => true, "token" => "ok", "user" => ["email" => $admin_email]]);
    } else {
        echo json_encode(["error" => "invalid"]);
    }
    exit;
}

if ($a === 'get_magazines') {
    $s = $conn->query("SELECT * FROM magazines ORDER BY id DESC");
    echo json_encode($s->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($a === 'get_magazine') {
    $id = $_GET['id'] ?? 0;
    $s = $conn->prepare("SELECT * FROM magazines WHERE id = ?");
    $s->execute([$id]);
    echo json_encode($s->fetch(PDO::FETCH_ASSOC));
    exit;
}

if ($a === 'get_interviews') {
    $s = $conn->query("SELECT * FROM interviews ORDER BY id DESC");
    echo json_encode($s->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($a === 'get_interview') {
    $id = $_GET['id'] ?? 0;
    $s = $conn->prepare("SELECT * FROM interviews WHERE id = ?");
    $s->execute([$id]);
    echo json_encode($s->fetch(PDO::FETCH_ASSOC));
    exit;
}

if ($a === 'add_contact') {
    $d = json_decode(file_get_contents("php://input"), true);
    $s = $conn->prepare("INSERT INTO contacts (name, email, phone, organization, service, subject, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $s->execute([$d['name'], $d['email'], $d['phone'], $d['organization'], $d['service'], $d['subject'], $d['message']]);
    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["status" => "online"]);
?>
