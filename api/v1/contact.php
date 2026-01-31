<?php
/**
 * ==============================================
 * File: contact.php
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 31, 2026
 * Description: Contact Form API Endpoint (API-011)
 * ==============================================
 */

declare(strict_types=1);

// Define API access constant
define('API_ACCESS', true);

// Load configuration
require_once __DIR__ . '/config.php';

// Set CORS headers
setCorsHeaders();

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Set JSON content type
header('Content-Type: application/json; charset=utf-8');

// Generate request ID for tracking
$requestId = generateRequestId();

/**
 * Send JSON response (API-014)
 */
function sendResponse(bool $success, string $message, ?array $data = null, ?array $errors = null, int $code = 200): void {
    global $requestId;
    
    http_response_code($code);
    
    $response = [
        'success' => $success,
        'message' => $message,
        'request_id' => $requestId
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    if ($errors !== null) {
        $response['errors'] = $errors;
    }
    
    echo json_encode($response);
    exit;
}

/**
 * Check rate limiting (API-016)
 */
function checkRateLimit(): bool {
    if (!RATE_LIMIT_ENABLED) {
        return true;
    }
    
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $rateFile = LOG_DIR . 'rate_limits_contact.json';
    
    $limits = [];
    if (file_exists($rateFile)) {
        $limits = json_decode(file_get_contents($rateFile), true) ?: [];
    }
    
    $now = time();
    $windowStart = $now - RATE_LIMIT_WINDOW;
    
    // Clean old entries
    foreach ($limits as $key => $data) {
        if ($data['timestamp'] < $windowStart) {
            unset($limits[$key]);
        }
    }
    
    // Check current IP
    if (isset($limits[$ip])) {
        if ($limits[$ip]['count'] >= RATE_LIMIT_MAX) {
            header("X-RateLimit-Limit: " . RATE_LIMIT_MAX);
            header("X-RateLimit-Remaining: 0");
            return false;
        }
        $limits[$ip]['count']++;
    } else {
        $limits[$ip] = ['count' => 1, 'timestamp' => $now];
    }
    
    header("X-RateLimit-Limit: " . RATE_LIMIT_MAX);
    header("X-RateLimit-Remaining: " . (RATE_LIMIT_MAX - $limits[$ip]['count']));
    
    file_put_contents($rateFile, json_encode($limits), LOCK_EX);
    
    return true;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logMessage('warning', 'Invalid request method for contact', ['method' => $_SERVER['REQUEST_METHOD'], 'request_id' => $requestId]);
    sendResponse(false, 'Method not allowed', null, null, 405);
}

// Check rate limiting
if (!checkRateLimit()) {
    logMessage('warning', 'Rate limit exceeded for contact', ['request_id' => $requestId]);
    sendResponse(false, ERROR_MESSAGES['rate_limit'], null, null, 429);
}

// Check honeypot (API-002)
if (!empty($_POST[HONEYPOT_FIELD])) {
    logMessage('info', 'Bot blocked by honeypot (contact)', ['request_id' => $requestId]);
    sendResponse(true, 'Your message has been received. We will contact you soon.');
}

// Check timestamp (API-003)
if (isset($_POST['formTimestamp'])) {
    $loadTime = intval($_POST['formTimestamp']);
    $submitTime = round(microtime(true) * 1000);
    $timeDiff = $submitTime - $loadTime;
    
    if ($timeDiff < MIN_SUBMISSION_TIME) {
        logMessage('info', 'Bot blocked by timestamp check (contact)', ['time_diff' => $timeDiff, 'request_id' => $requestId]);
        sendResponse(true, 'Your message has been received. We will contact you soon.');
    }
}

// Route to contact handler
require_once __DIR__ . '/../../php/contact-handler.php';
