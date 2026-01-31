<?php
/**
 * ==============================================
 * File: contact-handler.php
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 31, 2026
 * Description: Contact form processing and email sending (API-011)
 * ==============================================
 */

// Check if accessed via API
if (!defined('API_ACCESS')) {
    // Direct access - set up standalone mode
    define('API_ACCESS', true);
    require_once __DIR__ . '/../api/v1/config.php';
    setCorsHeaders();
    header('Content-Type: application/json; charset=utf-8');
    $requestId = generateRequestId();
    
    // Only accept POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed', 'request_id' => $requestId]);
        exit;
    }
    
    // Check honeypot
    if (!empty($_POST['website'])) {
        echo json_encode(['success' => true, 'message' => 'Your message has been received.', 'request_id' => $requestId]);
        exit;
    }
}

/**
 * Send JSON response and exit
 */
function sendResponse($success, $message, $data = null, $errors = null, $code = 200) {
    global $requestId;
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'request_id' => $requestId ?? null,
        'data' => $data,
        'errors' => $errors
    ]);
    exit;
}

/**
 * Sanitize input string (API-015)
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
 * Log form submission (API-017)
 */
function logSubmission($data, $status, $reason = '') {
    global $requestId;
    logMessage($status === 'SUCCESS' ? 'info' : ($status === 'BLOCKED' ? 'warning' : 'error'), 
        'Contact form: ' . $status,
        [
            'email' => $data['email'] ?? 'none',
            'subject' => $data['subject'] ?? 'none',
            'reason' => $reason,
            'request_id' => $requestId ?? null
        ]
    );
}

// Get and sanitize form data
$name = sanitize($_POST['name'] ?? '');
$email = sanitize($_POST['email'] ?? '');
$phone = sanitize($_POST['phone'] ?? '');
$subject = sanitize($_POST['subject'] ?? 'general');
$message = sanitize($_POST['message'] ?? '');

// Validate required fields
$errors = [];

if (empty($name)) {
    $errors['name'] = 'Please provide your name.';
}

if (empty($email)) {
    $errors['email'] = 'Please provide your email address.';
} elseif (!isValidEmail($email)) {
    $errors['email'] = 'Please provide a valid email address.';
}

if (empty($message)) {
    $errors['message'] = 'Please provide a message.';
} elseif (strlen($message) > MAX_MESSAGE_LENGTH) {
    $errors['message'] = 'Message is too long. Please keep it under 2000 characters.';
}

if (!empty($errors)) {
    logSubmission($_POST, 'INVALID', 'Validation failed');
    sendResponse(false, ERROR_MESSAGES['validation'], null, $errors, 400);
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
$emailSubject = '[Website Contact] ' . $subjectText . ' from ' . $name;

// Generate submission ID
$submissionId = 'CON_' . date('Ymd') . '_' . substr(md5(uniqid((string)mt_rand(), true)), 0, 8);

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
    'From: ' . FROM_EMAIL,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Submission-ID: ' . $submissionId
];

// Attempt to send email
$mailSent = mail(
    ADMIN_EMAIL,
    $emailSubject,
    $emailBody,
    implode("\r\n", $headers)
);

if ($mailSent) {
    logSubmission($_POST, 'SUCCESS', 'Email sent successfully');
    sendResponse(true, 'Thank you for your message! We will get back to you within 24 hours.', [
        'submission_id' => $submissionId
    ]);
} else {
    logSubmission($_POST, 'FAILED', 'Mail function failed');
    sendResponse(false, ERROR_MESSAGES['email_failed'], null, null, 500);
}
