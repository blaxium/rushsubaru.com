<?php
/**
 * ==============================================
 * File: config.php
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 31, 2026
 * Description: API Configuration (API-013)
 * ==============================================
 */

declare(strict_types=1);

// Prevent direct access
if (!defined('API_ACCESS')) {
    header('HTTP/1.1 403 Forbidden');
    exit('Direct access not allowed');
}

// Environment detection
define('IS_PRODUCTION', strpos($_SERVER['HTTP_HOST'] ?? '', 'rushsubaru.com') !== false);

// Debug mode (disable in production)
define('DEBUG_MODE', !IS_PRODUCTION);

// Admin email
define('ADMIN_EMAIL', 'sales@rushsubaru.com');
define('ADMIN_NAME', 'Zaza Rush Subaru');
define('FROM_EMAIL', 'noreply@rushsubaru.com');

// File upload settings
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('MAX_TOTAL_ATTACHMENT_SIZE', 10 * 1024 * 1024); // 10MB for all attachments
define('MAX_IMAGE_WIDTH', 1200); // Resize images to max 1200px width
define('JPEG_QUALITY', 80); // JPEG compression quality
define('MAX_IMAGES', 5);
define('ALLOWED_MIME_TYPES', [
    'image/jpeg',
    'image/png',
    'image/webp'
]);
define('UPLOAD_DIR', __DIR__ . '/../../php/uploads/');
define('TEMP_DIR', __DIR__ . '/../../php/temp/');
define('LOG_DIR', __DIR__ . '/../../php/logs/');

// Rate limiting
define('RATE_LIMIT_ENABLED', true);
define('RATE_LIMIT_MAX', 10); // Maximum requests per hour
define('RATE_LIMIT_WINDOW', 3600); // 1 hour in seconds

// Anti-spam settings
define('MIN_SUBMISSION_TIME', 3000); // 3 seconds in milliseconds
define('HONEYPOT_FIELD', 'website');

// CORS settings
define('ALLOWED_ORIGINS', [
    'https://rushsubaru.com',
    'https://www.rushsubaru.com',
    'http://localhost',
    'http://127.0.0.1',
    'http://rushsubaru.local'
]);

// Error messages (user-friendly)
define('ERROR_MESSAGES', [
    'generic' => 'An error occurred. Please try again or contact us directly.',
    'validation' => 'Please check your input and try again.',
    'rate_limit' => 'Too many requests. Please wait a moment and try again.',
    'file_type' => 'Invalid file type. Only JPG, PNG, and WebP images are allowed.',
    'file_size' => 'File too large. Maximum size is 5MB per image.',
    'max_files' => 'Maximum 5 images allowed.',
    'email_failed' => 'Unable to send message. Please try WhatsApp or call us directly.'
]);

/**
 * Get CORS origin
 * @return string|null Allowed origin or null
 */
function getCorsOrigin(): ?string {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, ALLOWED_ORIGINS)) {
        return $origin;
    }
    
    // Allow localhost with any port in development
    if (!IS_PRODUCTION && preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
        return $origin;
    }
    
    return null;
}

/**
 * Set CORS headers (API-018)
 */
function setCorsHeaders(): void {
    $origin = getCorsOrigin();
    
    if ($origin) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
        header('Access-Control-Max-Age: 86400'); // 24 hours
    }
}

/**
 * Create required directories
 */
function ensureDirectoriesExist(): void {
    $dirs = [UPLOAD_DIR, TEMP_DIR, LOG_DIR];
    
    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
    }
}

/**
 * Generate unique request ID for logging (API-017)
 * @return string Request ID
 */
function generateRequestId(): string {
    return 'REQ_' . date('Ymd_His') . '_' . substr(md5(uniqid((string)mt_rand(), true)), 0, 8);
}

/**
 * Log to file (API-017)
 * @param string $type Log type (info, error, warning)
 * @param string $message Log message
 * @param array $context Additional context
 */
function logMessage(string $type, string $message, array $context = []): void {
    ensureDirectoriesExist();
    
    $logFile = LOG_DIR . date('Y-m-d') . '.log';
    $timestamp = date('Y-m-d H:i:s');
    $requestId = $context['request_id'] ?? 'N/A';
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    $logEntry = "[{$timestamp}] [{$type}] [{$requestId}] [IP: {$ip}] {$message}";
    
    if (!empty($context)) {
        $contextStr = json_encode(array_diff_key($context, ['request_id' => 1]));
        $logEntry .= " | Context: {$contextStr}";
    }
    
    $logEntry .= PHP_EOL;
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Initialize directories
ensureDirectoriesExist();
