<?php
// send_order.php
header('Content-Type: application/json');

try {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);

  $to = "omonsiahoo@yahoo.com"; // Fixed email address
  $subject = $data['subject'] ?? 'New Order Request';
  $msg = $data['message'] ?? '';
  $client = $data['client'] ?? [];

  if (!$msg) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing message']);
    exit;
  }

  // --------- EMAIL ---------
  $html = nl2br(htmlspecialchars($msg, ENT_QUOTES, 'UTF-8'));
  $headers  = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  $headers .= "From: Omonsiah Orders <no-reply@{$_SERVER['HTTP_HOST']}>\r\n";
  $headers .= "Reply-To: ".($client['email'] ?? 'no-reply@'.$_SERVER['HTTP_HOST'])."\r\n";

  $mail_ok = mail($to, $subject, $html, $headers);

  // --------- WHATSAPP ---------
  // WhatsApp API link (using wa.me simple method - requires WhatsApp installed on phone)
  // For automation without phone, you'd need Twilio WhatsApp API or WhatsApp Cloud API.
  $whatsappNumber = "2348060074414"; // Your WhatsApp number without +
  $waMessage = urlencode($msg);
  
  // Cloud API example (requires access token)
  // $accessToken = "YOUR_FACEBOOK_ACCESS_TOKEN";
  // $phoneId = "YOUR_PHONE_NUMBER_ID";
  // $waData = [
  //   "messaging_product" => "whatsapp",
  //   "to" => $whatsappNumber,
  //   "type" => "text",
  //   "text" => ["body" => $msg]
  // ];
  // $ch = curl_init("https://graph.facebook.com/v18.0/$phoneId/messages");
  // curl_setopt($ch, CURLOPT_HTTPHEADER, [
  //   "Authorization: Bearer $accessToken",
  //   "Content-Type: application/json"
  // ]);
  // curl_setopt($ch, CURLOPT_POST, true);
  // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($waData));
  // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  // $wa_result = curl_exec($ch);
  // curl_close($ch);

  echo json_encode([
    'ok' => (bool)$mail_ok,
    'whatsapp_url' => "https://wa.me/$whatsappNumber?text=$waMessage"
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Server error']);
}
