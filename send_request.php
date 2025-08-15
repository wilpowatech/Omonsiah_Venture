<?php
// Your email
$to = "omonsiah@yahoo.com"; // Fixed email address

// Collect form data
$name = $_POST['sellerName'] ?? '';
$email = $_POST['sellerEmail'] ?? '';
$phone = $_POST['sellerPhone'] ?? '';
$desc = $_POST['productDesc'] ?? '';

// Email subject & message
$subject = "New Product Request from $name";
$message = "You have a new request from Omonsiah Contact Form:\n\n";
$message .= "Name: $name\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n";
$message .= "Description: $desc\n";

// File upload handling
$attachment = $_FILES['productImage']['tmp_name'] ?? '';
$attachmentName = $_FILES['productImage']['name'] ?? '';

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// If there's an attachment
if ($attachment && file_exists($attachment)) {
    $file_size = filesize($attachment);
    $handle = fopen($attachment, "r");
    $content = fread($handle, $file_size);
    fclose($handle);
    $content = chunk_split(base64_encode($content));

    $uid = md5(uniqid(time()));
    $filename = basename($attachmentName);

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";

    $body = "--".$uid."\r\n";
    $body .= "Content-type:text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message."\r\n\r\n";
    $body .= "--".$uid."\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
    $body .= $content."\r\n\r\n";
    $body .= "--".$uid."--";

    mail($to, $subject, $body, $headers);
} else {
    // No attachment
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    mail($to, $subject, $message, $headers);
}

// Redirect or confirmation
header("Location: thankyou.html");
exit;
?>
