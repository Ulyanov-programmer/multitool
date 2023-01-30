<?php
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Thanks MaxGraph for this script, https://www.youtube.com/c/maxgraph 

$c     = true;
// $file = $_FILES['file'];
$title = 'Title';

// Tabular data layout.
foreach ($_POST as $key => $value) {
  if ($value != '' && $key != 'project_name' && $key != 'admin_email' && $key != 'form_subject') {
    $body .= '
    ' . (($c = !$c) ? '<tr>' : "<tr style='background-color: #f8f8f8;'>") . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}
$body = "<table style='width: 100%;'>$body</table>";


$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet    = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Settings of PHPMailer
  $mail->Host       = 'smtp.yandex.ru'; // SMTP server of an email.
  $mail->Username   = 'example@ex.com'; // Login of email.
  $mail->Password   = ''; // Password of an SMTP.
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  // From where an email is sent and the text (it's usually your or the organization's name).
  $mail->setFrom($mail->Username, 'YourName');
  // Where an email is being sent.
  $mail->addAddress('example@ex.com');

  // Embedding files in an letter
  // if (!empty($file['name'][0])) {
  //   for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
  //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
  //     $filename = $file['name'][$ct];
  //     if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
  //         $mail->addAttachment($uploadfile, $filename);
  //         $rfile[] = 'Successfully! $filename';
  //     } else {
  //         $rfile[] = 'Error! $filename';
  //     }
  //   }
  // }


  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body    = $body;

  // Sending
  $mail->send();

} catch (Exception $ex) {
  $status = "This letter wasn't sent. The reason for this error: {$mail->ErrorInfo}";
}