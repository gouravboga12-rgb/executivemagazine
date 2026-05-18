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
    
    // Auto-create tables if they don't exist
    $conn->exec("CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        organization VARCHAR(255),
        service VARCHAR(100),
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

    $conn->exec("CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        source_page VARCHAR(100),
        type VARCHAR(100),
        description TEXT,
        status VARCHAR(50) DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

    $conn->exec("CREATE TABLE IF NOT EXISTS magazines (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        edition VARCHAR(255),
        image_url TEXT,
        pdf_url TEXT,
        tag VARCHAR(100),
        description TEXT,
        featured TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

    $conn->exec("CREATE TABLE IF NOT EXISTS interviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        preview_url TEXT,
        pdf_url TEXT,
        industry TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

    $conn->exec("CREATE TABLE IF NOT EXISTS settings (
        `key` VARCHAR(255) PRIMARY KEY,
        `value` TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;");

    // Auto-alter table contacts to add missing columns if they don't exist
    try {
        $conn->exec("ALTER TABLE contacts ADD COLUMN subject VARCHAR(255) NULL AFTER service");
    } catch (PDOException $e) {}
    try {
        $conn->exec("ALTER TABLE contacts ADD COLUMN message TEXT NULL AFTER subject");
    } catch (PDOException $e) {}
} catch (PDOException $e) {
    echo json_encode(["error" => "db_fail", "message" => $e->getMessage()]);
    exit;
}

try {
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

    if ($a === 'get_settings') {
        $s = $conn->query("SELECT * FROM settings");
        $rows = $s->fetchAll(PDO::FETCH_ASSOC);
        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['key']] = $row['value'];
        }
        echo json_encode($settings);
        exit;
    }

    if ($a === 'update_settings') {
        $d = json_decode(file_get_contents("php://input"), true);
        if (is_array($d)) {
            foreach ($d as $key => $value) {
                $s = $conn->prepare("INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?");
                $s->execute([$key, $value, $value]);
            }
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "invalid_data"]);
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

    if ($a === 'get_contacts') {
        $s = $conn->query("SELECT * FROM contacts ORDER BY id DESC");
        echo json_encode($s->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    if ($a === 'get_leads') {
        $s = $conn->query("SELECT * FROM leads ORDER BY id DESC");
        echo json_encode($s->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    if ($a === 'add_contact') {
        $d = json_decode(file_get_contents("php://input"), true);
        
        $name = $d['name'] ?? '';
        $email = $d['email'] ?? '';
        $phone = $d['phone'] ?? '';
        $org = $d['organization'] ?? '';
        $service = $d['service'] ?? 'General Inquiry';
        $subject = $d['subject'] ?? 'Website Inquiry';
        $message = $d['message'] ?? '';

        $s = $conn->prepare("INSERT INTO contacts (name, email, phone, organization, service, subject, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $s->execute([$name, $email, $phone, $org, $service, $subject, $message]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'add_lead') {
        $d = json_decode(file_get_contents("php://input"), true);
        $email = $d['email'] ?? '';
        $source_page = $d['source_page'] ?? '';
        $type = $d['type'] ?? '';
        $description = $d['description'] ?? '';
        $status = $d['status'] ?? 'New';
        
        $s = $conn->prepare("INSERT INTO leads (email, source_page, type, description, status) VALUES (?, ?, ?, ?, ?)");
        $s->execute([$email, $source_page, $type, $description, $status]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'update_lead_status') {
        $d = json_decode(file_get_contents("php://input"), true);
        $id = $d['id'] ?? 0;
        $status = $d['status'] ?? '';
        
        $s = $conn->prepare("UPDATE leads SET status = ? WHERE id = ?");
        $s->execute([$status, $id]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'delete') {
        $table = $_GET['table'] ?? '';
        $id = $_GET['id'] ?? 0;
        $allowed_tables = ['contacts', 'leads', 'interviews', 'magazines'];
        if (in_array($table, $allowed_tables)) {
            $s = $conn->prepare("DELETE FROM $table WHERE id = ?");
            $s->execute([$id]);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Invalid table"]);
        }
        exit;
    }

    if ($a === 'add_interview') {
        $d = json_decode(file_get_contents("php://input"), true);
        $company = $d['company'] ?? '';
        $preview_url = $d['preview_url'] ?? '';
        $pdf_url = $d['pdf_url'] ?? '';
        $industry = $d['industry'] ?? '';
        
        $s = $conn->prepare("INSERT INTO interviews (company, preview_url, pdf_url, industry) VALUES (?, ?, ?, ?)");
        $s->execute([$company, $preview_url, $pdf_url, $industry]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'update_interview') {
        $d = json_decode(file_get_contents("php://input"), true);
        $id = $d['id'] ?? 0;
        $company = $d['company'] ?? '';
        $preview_url = $d['preview_url'] ?? '';
        $pdf_url = $d['pdf_url'] ?? '';
        $industry = $d['industry'] ?? '';
        
        $s = $conn->prepare("UPDATE interviews SET company = ?, preview_url = ?, pdf_url = ?, industry = ? WHERE id = ?");
        $s->execute([$company, $preview_url, $pdf_url, $industry, $id]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'add_magazine') {
        $d = json_decode(file_get_contents("php://input"), true);
        $title = $d['title'] ?? '';
        $edition = $d['edition'] ?? '';
        $image_url = $d['image_url'] ?? '';
        $pdf_url = $d['pdf_url'] ?? '';
        $tag = $d['tag'] ?? '';
        $description = $d['description'] ?? '';
        $featured = $d['featured'] ?? false;
        
        $s = $conn->prepare("INSERT INTO magazines (title, edition, image_url, pdf_url, tag, description, featured) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $s->execute([$title, $edition, $image_url, $pdf_url, $tag, $description, (int)$featured]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'update_magazine') {
        $d = json_decode(file_get_contents("php://input"), true);
        $id = $d['id'] ?? 0;
        $title = $d['title'] ?? '';
        $edition = $d['edition'] ?? '';
        $image_url = $d['image_url'] ?? '';
        $pdf_url = $d['pdf_url'] ?? '';
        $tag = $d['tag'] ?? '';
        $description = $d['description'] ?? '';
        $featured = $d['featured'] ?? false;
        
        $s = $conn->prepare("UPDATE magazines SET title = ?, edition = ?, image_url = ?, pdf_url = ?, tag = ?, description = ?, featured = ? WHERE id = ?");
        $s->execute([$title, $edition, $image_url, $pdf_url, $tag, $description, (int)$featured, $id]);
        echo json_encode(["success" => true]);
        exit;
    }

    if ($a === 'upload') {
        if(isset($_FILES['file'])) {
            $uploadDir = 'uploads/';
            if(!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
            $fileName = time() . '_' . basename($_FILES['file']['name']);
            $targetPath = $uploadDir . $fileName;
            
            if(move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
                $url = 'https://' . $_SERVER['HTTP_HOST'] . '/' . ltrim($targetPath, './');
                echo json_encode(["success" => true, "url" => $url]);
            } else {
                echo json_encode(["error" => "Upload failed"]);
            }
        } else {
            echo json_encode(["error" => "No file provided"]);
        }
        exit;
    }

    if ($a === 'check_contacts') {
        $s = $conn->query("DESCRIBE contacts");
        echo json_encode($s->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    echo json_encode(["status" => "online"]);
} catch (\Throwable $e) {
    echo json_encode(["error" => "exception", "message" => $e->getMessage()]);
    exit;
}
?>
