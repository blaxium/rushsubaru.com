<?php
/**
 * ==============================================
 * File: contact-handler.php
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 30, 2026
 * Description: Contact form processing and email sending
 * ==============================================
 */

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Configuration
$config = [
    'recipient_email' => 'info@zazarushsubaru.co.zw',
    'recipient_name' => 'Zaza Rush Subaru',
    'from_email' => 'noreply@zazarushsubaru.co.zw',
    'subject_prefix' => '[Website Contact] ',
    'min_submission_time' => 3000, // 3 seconds in milliseconds
    'max_message_length' => 2000
];

/**
 * Send JSON response and exit
 */
function sendResponse($success, $message, $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

/**
 * Sanitize input string
 */
function sanitize($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email format
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Log form submission
 */
function logSubmission($data, $status, $reason = '') {
    $logFile = __DIR__ . '/logs/contact-submissions.log';
    $logDir = dirname($logFile);
    
    // Create logs directory if it doesn't exist
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $logEntry = date('Y-m-d H:i:s') . ' | ';
    $logEntry .= $status . ' | ';
    $logEntry .= 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . ' | ';
    $logEntry .= 'Email: ' . ($data['email'] ?? 'none') . ' | ';
    $logEntry .= 'Subject: ' . ($data['subject'] ?? 'none') . ' | ';
    $logEntry .= 'Reason: ' . $reason . PHP_EOL;
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method', 405);
}

// Check honeypot field (CON-012)
if (!empty($_POST['website'])) {
    logSubmission($_POST, 'BLOCKED', 'Honeypot filled');
    // Return fake success to not alert bots
    sendResponse(true, 'Your message has been received.');
}

// Check time-based validation (CON-013)
if (isset($_POST['formTimestamp'])) {
    $loadTime = intval($_POST['formTimestamp']);
    $currentTime = round(microtime(true) * 1000);
    $timeDiff = $currentTime - $loadTime;
    
    if ($timeDiff < $config['min_submission_time']) {
        logSubmission($_POST, 'BLOCKED', 'Submitted too quickly');
        // Return fake success to not alert bots
        sendResponse(true, 'Your message has been received.');
    }
}

// Get and sanitize form data
$name = sanitize($_POST['name'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$phone = sanitize($_POST['phone'] ?? '');
$subject = sanitize($_POST['subject'] ?? 'general');
$message = sanitize($_POST['message'] ?? '');

// Validate required fields (CON-023)
if (empty($name)) {
    logSubmission($_POST, 'INVALID', 'Missing name');
    sendResponse(false, 'Please provide your name.', 400);
}

if (empty($email)) {
    logSubmission($_POST, 'INVALID', 'Missing email');
    sendResponse(false, 'Please provide your email address.', 400);
}

if (!isValidEmail($email)) {
    logSubmission($_POST, 'INVALID', 'Invalid email format');
    sendResponse(false, 'Please provide a valid email address.', 400);
}

if (empty($message)) {
    logSubmission($_POST, 'INVALID', 'Missing message');
    sendResponse(false, 'Please provide a message.', 400);
}

// Validate message length
if (strlen($message) > $config['max_message_length']) {
    logSubmission($_POST, 'INVALID', 'Message too long');
    sendResponse(false, 'Message is too long. Please keep it under 2000 characters.', 400);
}

// Map subject values to readable text
$subjectMap = [
    'general' => 'General Inquiry',
    'services' => 'Service Inquiry',
    'parts' => 'Parts Inquiry',
    'sell-car' => 'Sell My Car',
    'quote' => 'Quote Request',
    'other' => 'Other'
];

$subjectText = $subjectMap[$subject] ?? 'General Inquiry';
$emailSubject = $config['subject_prefix'] . $subjectText . ' from ' . $name;

// Build email body
$emailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0033A0; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0033A0; }
        .value { margin-top: 5px; }
        .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>{$name}</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>{$email}</div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>" . ($phone ?: 'Not provided') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>{$subjectText}</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This message was sent from the Zaza Rush Subaru website contact form.</p>
            <p>Submitted on: " . date('F j, Y \a\t g:i A') . "</p>
            <p>IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $config['from_email'],
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Attempt to send email
$mailSent = mail(
    $config['recipient_email'],
    $emailSubject,
    $emailBody,
    implode("\r\n", $headers)
);

if ($mailSent) {
    logSubmission($_POST, 'SUCCESS', 'Email sent successfully');
    sendResponse(true, 'Thank you for your message! We will get back to you within 24 hours.');
} else {
    logSubmission($_POST, 'FAILED', 'Mail function failed');
    sendResponse(false, 'Sorry, there was an error sending your message. Please try again or contact us directly.', 500);
}
