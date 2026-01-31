<?php
/**
 * ==============================================
 * File: vehicle.php
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 31, 2026
 * Description: Vehicle Submission API Endpoint (API-012)
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
 * @param bool $success Success status
 * @param string $message Response message
 * @param array|null $data Additional data
 * @param array|null $errors Validation errors
 * @param int $code HTTP status code
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
 * @return bool Is within rate limit
 */
function checkRateLimit(): bool {
    if (!RATE_LIMIT_ENABLED) {
        return true;
    }
    
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $rateFile = LOG_DIR . 'rate_limits.json';
    
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
            $remaining = $limits[$ip]['timestamp'] + RATE_LIMIT_WINDOW - $now;
            header("X-RateLimit-Limit: " . RATE_LIMIT_MAX);
            header("X-RateLimit-Remaining: 0");
            header("X-RateLimit-Reset: " . ($now + $remaining));
            return false;
        }
        $limits[$ip]['count']++;
    } else {
        $limits[$ip] = ['count' => 1, 'timestamp' => $now];
    }
    
    // Set rate limit headers
    header("X-RateLimit-Limit: " . RATE_LIMIT_MAX);
    header("X-RateLimit-Remaining: " . (RATE_LIMIT_MAX - $limits[$ip]['count']));
    
    // Save limits
    file_put_contents($rateFile, json_encode($limits), LOCK_EX);
    
    return true;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logMessage('warning', 'Invalid request method', ['method' => $_SERVER['REQUEST_METHOD'], 'request_id' => $requestId]);
    sendResponse(false, 'Method not allowed', null, null, 405);
}

// Check rate limiting
if (!checkRateLimit()) {
    logMessage('warning', 'Rate limit exceeded', ['request_id' => $requestId]);
    sendResponse(false, ERROR_MESSAGES['rate_limit'], null, null, 429);
}

// Check honeypot (API-002)
if (!empty($_POST[HONEYPOT_FIELD])) {
    logMessage('info', 'Bot blocked by honeypot', ['request_id' => $requestId]);
    // Return fake success to not alert spammer
    sendResponse(true, 'Your submission has been received. We will contact you soon.');
}

// Check timestamp (API-003)
if (isset($_POST['formTimestamp'])) {
    $loadTime = intval($_POST['formTimestamp']);
    $submitTime = round(microtime(true) * 1000);
    $timeDiff = $submitTime - $loadTime;
    
    if ($timeDiff < MIN_SUBMISSION_TIME) {
        logMessage('info', 'Bot blocked by timestamp check', ['time_diff' => $timeDiff, 'request_id' => $requestId]);
        sendResponse(true, 'Your submission has been received. We will contact you soon.');
    }
}

// Load handlers
require_once __DIR__ . '/../../php/vehicle-handler.php';
