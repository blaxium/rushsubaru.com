<?php
/**
 * ==============================================
 * File: vehicle-handler.php
 * Project: Zaza Rush Subaru
 * Developer: bguvava
 * Last Updated: January 31, 2026
 * Description: Vehicle submission processing (API-005 to API-008)
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
    
    /**
     * Send JSON response
     */
    function sendResponse(bool $success, string $message, ?array $data = null, ?array $errors = null, int $code = 200): void {
        global $requestId;
        http_response_code($code);
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'request_id' => $requestId,
            'data' => $data,
            'errors' => $errors
        ]);
        exit;
    }
    
    // Only accept POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendResponse(false, 'Method not allowed', null, null, 405);
    }
    
    // Check honeypot
    if (!empty($_POST['website'])) {
        sendResponse(true, 'Your submission has been received.');
    }
}

/**
 * Sanitize input (API-015)
 * @param string $input Input string
 * @return string Sanitized string
 */
function sanitize(string $input): string {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email format
 * @param string $email Email to validate
 * @return bool Is valid
 */
function isValidEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate Zimbabwe phone number
 * @param string $phone Phone number
 * @return bool Is valid
 */
function isValidZimbabwePhone(string $phone): bool {
    $cleaned = preg_replace('/\s/', '', $phone);
    return preg_match('/^(\+263|263|0)7[0-9]{8}$/', $cleaned) === 1;
}

/**
 * Process uploaded images (API-006, API-007)
 * @param array $files $_FILES array
 * @return array Processed image paths
 */
function processImages(array $files): array {
    $processedImages = [];
    $errors = [];
    
    // Handle both single and multiple file uploads
    if (isset($files['photos'])) {
        $photos = $files['photos'];
        
        // Normalize to array format
        if (!is_array($photos['name'])) {
            $photos = [
                'name' => [$photos['name']],
                'type' => [$photos['type']],
                'tmp_name' => [$photos['tmp_name']],
                'error' => [$photos['error']],
                'size' => [$photos['size']]
            ];
        }
        
        $count = min(count($photos['name']), MAX_IMAGES);
        
        for ($i = 0; $i < $count; $i++) {
            if ($photos['error'][$i] !== UPLOAD_ERR_OK) {
                continue;
            }
            
            $tmpPath = $photos['tmp_name'][$i];
            $originalName = $photos['name'][$i];
            $mimeType = $photos['type'][$i];
            $fileSize = $photos['size'][$i];
            
            // Validate MIME type
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $actualMime = $finfo->file($tmpPath);
            
            if (!in_array($actualMime, ALLOWED_MIME_TYPES)) {
                $errors[] = "Invalid file type for {$originalName}";
                continue;
            }
            
            // Validate file size
            if ($fileSize > MAX_FILE_SIZE) {
                $errors[] = "{$originalName} exceeds 5MB limit";
                continue;
            }
            
            // Generate unique filename
            $extension = 'jpg'; // Convert all to JPEG
            $uniqueName = 'vehicle_' . date('Ymd_His') . '_' . uniqid() . '.' . $extension;
            $tempPath = TEMP_DIR . $uniqueName;
            
            // Process and resize image (API-007)
            if (processAndResizeImage($tmpPath, $tempPath, $actualMime)) {
                $processedImages[] = [
                    'path' => $tempPath,
                    'name' => $uniqueName,
                    'original' => $originalName
                ];
            } else {
                $errors[] = "Failed to process {$originalName}";
            }
        }
    }
    
    return ['images' => $processedImages, 'errors' => $errors];
}

/**
 * Process and resize image (API-007)
 * @param string $source Source path
 * @param string $destination Destination path
 * @param string $mimeType MIME type
 * @return bool Success
 */
function processAndResizeImage(string $source, string $destination, string $mimeType): bool {
    // Ensure temp directory exists
    if (!is_dir(dirname($destination))) {
        mkdir(dirname($destination), 0755, true);
    }
    
    // Load image based on type
    $image = null;
    switch ($mimeType) {
        case 'image/jpeg':
            $image = @imagecreatefromjpeg($source);
            break;
        case 'image/png':
            $image = @imagecreatefrompng($source);
            break;
        case 'image/webp':
            $image = @imagecreatefromwebp($source);
            break;
    }
    
    if (!$image) {
        return false;
    }
    
    // Get dimensions
    $width = imagesx($image);
    $height = imagesy($image);
    
    // Calculate new dimensions if needed
    if ($width > MAX_IMAGE_WIDTH) {
        $ratio = MAX_IMAGE_WIDTH / $width;
        $newWidth = MAX_IMAGE_WIDTH;
        $newHeight = (int)($height * $ratio);
        
        // Create resized image
        $resized = imagecreatetruecolor($newWidth, $newHeight);
        
        // Preserve transparency for PNG
        imagealphablending($resized, false);
        imagesavealpha($resized, true);
        
        // Resize
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        
        imagedestroy($image);
        $image = $resized;
    }
    
    // Save as JPEG
    $result = imagejpeg($image, $destination, JPEG_QUALITY);
    imagedestroy($image);
    
    return $result;
}

/**
 * Clean up temporary files
 * @param array $images Array of image data
 */
function cleanupTempFiles(array $images): void {
    foreach ($images as $image) {
        if (isset($image['path']) && file_exists($image['path'])) {
            @unlink($image['path']);
        }
    }
}

// ============================================
// MAIN PROCESSING
// ============================================

try {
    // Get and sanitize form data (API-015)
    $ownerName = sanitize($_POST['ownerName'] ?? '');
    $contactNumber = sanitize($_POST['contactNumber'] ?? '');
    $ownerEmail = sanitize($_POST['ownerEmail'] ?? '');
    $vehicleMake = sanitize($_POST['vehicleMake'] ?? 'Subaru');
    $vehicleModel = sanitize($_POST['vehicleModel'] ?? '');
    $vehicleYear = sanitize($_POST['vehicleYear'] ?? '');
    $vehicleMileage = sanitize($_POST['vehicleMileage'] ?? '');
    $vehicleCondition = sanitize($_POST['vehicleCondition'] ?? '');
    $askingPrice = sanitize($_POST['askingPrice'] ?? '');
    $vehicleDescription = sanitize($_POST['vehicleDescription'] ?? '');
    
    // Validation errors
    $errors = [];
    
    // Validate required fields
    if (empty($ownerName) || strlen($ownerName) < 2) {
        $errors['ownerName'] = 'Please enter your full name';
    }
    
    if (empty($contactNumber) || !isValidZimbabwePhone($contactNumber)) {
        $errors['contactNumber'] = 'Please enter a valid Zimbabwe phone number';
    }
    
    if (empty($ownerEmail) || !isValidEmail($ownerEmail)) {
        $errors['ownerEmail'] = 'Please enter a valid email address';
    }
    
    if (empty($vehicleModel)) {
        $errors['vehicleModel'] = 'Please select a vehicle model';
    }
    
    if (empty($vehicleYear)) {
        $errors['vehicleYear'] = 'Please select the year of manufacture';
    }
    
    if (empty($vehicleMileage)) {
        $errors['vehicleMileage'] = 'Please enter the vehicle mileage';
    }
    
    if (empty($vehicleCondition)) {
        $errors['vehicleCondition'] = 'Please select the vehicle condition';
    }
    
    if (empty($vehicleDescription) || strlen($vehicleDescription) < 50) {
        $errors['vehicleDescription'] = 'Please provide at least 50 characters describing your vehicle';
    }
    
    // Return validation errors
    if (!empty($errors)) {
        logMessage('info', 'Vehicle form validation failed', ['errors' => $errors, 'request_id' => $requestId]);
        sendResponse(false, ERROR_MESSAGES['validation'], null, $errors, 400);
    }
    
    // Process uploaded images
    $imageResult = processImages($_FILES);
    $processedImages = $imageResult['images'];
    
    // Log image processing errors (non-fatal)
    if (!empty($imageResult['errors'])) {
        logMessage('warning', 'Some images failed to process', ['errors' => $imageResult['errors'], 'request_id' => $requestId]);
    }
    
    // Generate submission ID
    $submissionId = 'VEH_' . date('Ymd') . '_' . substr(md5(uniqid((string)mt_rand(), true)), 0, 8);
    
    // Prepare email content
    $conditionLabel = $vehicleCondition === 'runner' ? 'Runner (Driveable)' : 'Non-Runner (Not Driveable)';
    $priceDisplay = !empty($askingPrice) ? '$' . number_format((float)$askingPrice) . ' USD' : 'Not specified - Request valuation';
    
    // Send email (API-008)
    $emailSent = sendVehicleEmail(
        $submissionId,
        $ownerName,
        $contactNumber,
        $ownerEmail,
        $vehicleMake,
        $vehicleModel,
        $vehicleYear,
        $vehicleMileage,
        $conditionLabel,
        $priceDisplay,
        $vehicleDescription,
        $processedImages
    );
    
    // Clean up temp files
    cleanupTempFiles($processedImages);
    
    if ($emailSent) {
        logMessage('info', 'Vehicle submission successful', [
            'submission_id' => $submissionId,
            'email' => $ownerEmail,
            'model' => $vehicleModel,
            'images' => count($processedImages),
            'request_id' => $requestId
        ]);
        
        sendResponse(true, 'Thank you! Your vehicle submission has been received. We will contact you within 24-48 hours.', [
            'submission_id' => $submissionId
        ]);
    } else {
        logMessage('error', 'Failed to send vehicle email', ['submission_id' => $submissionId, 'request_id' => $requestId]);
        sendResponse(false, ERROR_MESSAGES['email_failed'], null, null, 500);
    }
    
} catch (Exception $e) {
    logMessage('error', 'Vehicle handler exception: ' . $e->getMessage(), ['request_id' => $requestId]);
    
    if (DEBUG_MODE) {
        sendResponse(false, $e->getMessage(), null, null, 500);
    } else {
        sendResponse(false, ERROR_MESSAGES['generic'], null, null, 500);
    }
}

/**
 * Send vehicle submission email with attachments (API-008)
 */
function sendVehicleEmail(
    string $submissionId,
    string $ownerName,
    string $contactNumber,
    string $ownerEmail,
    string $vehicleMake,
    string $vehicleModel,
    string $vehicleYear,
    string $vehicleMileage,
    string $vehicleCondition,
    string $askingPrice,
    string $vehicleDescription,
    array $images
): bool {
    // Build email body using template
    $emailBody = getVehicleEmailTemplate(
        $submissionId,
        $ownerName,
        $contactNumber,
        $ownerEmail,
        $vehicleMake,
        $vehicleModel,
        $vehicleYear,
        $vehicleMileage,
        $vehicleCondition,
        $askingPrice,
        $vehicleDescription,
        count($images)
    );
    
    $subject = "[Vehicle Submission] {$vehicleYear} {$vehicleMake} {$vehicleModel} - {$submissionId}";
    
    // Build email with attachments
    $boundary = md5(time());
    
    $headers = [
        'MIME-Version: 1.0',
        "Content-Type: multipart/mixed; boundary=\"{$boundary}\"",
        'From: ' . FROM_EMAIL,
        'Reply-To: ' . $ownerEmail,
        'X-Mailer: PHP/' . phpversion(),
        'X-Submission-ID: ' . $submissionId
    ];
    
    // Build multipart message
    $message = "--{$boundary}\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $emailBody . "\r\n\r\n";
    
    // Add image attachments
    $totalSize = 0;
    foreach ($images as $image) {
        if (!file_exists($image['path'])) continue;
        
        $fileSize = filesize($image['path']);
        if ($totalSize + $fileSize > MAX_TOTAL_ATTACHMENT_SIZE) {
            break; // Stop adding attachments if we exceed limit
        }
        
        $fileData = file_get_contents($image['path']);
        $fileData = chunk_split(base64_encode($fileData));
        
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: image/jpeg; name=\"{$image['name']}\"\r\n";
        $message .= "Content-Disposition: attachment; filename=\"{$image['name']}\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $message .= $fileData . "\r\n";
        
        $totalSize += $fileSize;
    }
    
    $message .= "--{$boundary}--";
    
    return mail(ADMIN_EMAIL, $subject, $message, implode("\r\n", $headers));
}

/**
 * Get vehicle email HTML template (API-009, API-010)
 */
function getVehicleEmailTemplate(
    string $submissionId,
    string $ownerName,
    string $contactNumber,
    string $ownerEmail,
    string $vehicleMake,
    string $vehicleModel,
    string $vehicleYear,
    string $vehicleMileage,
    string $vehicleCondition,
    string $askingPrice,
    string $vehicleDescription,
    int $imageCount
): string {
    $submittedDate = date('F j, Y \a\t g:i A');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vehicle Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #0033A0, #0055FF); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚗 New Vehicle Submission</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Sell Your Subaru Form</p>
            </td>
        </tr>
        
        <!-- Submission ID -->
        <tr>
            <td style="padding: 20px; background-color: #E6F0FF; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #666;">Submission ID</p>
                <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #0033A0;">{$submissionId}</p>
            </td>
        </tr>
        
        <!-- Owner Information -->
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0033A0; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #E6F0FF; padding-bottom: 10px;">
                    👤 Owner Information
                </h2>
                <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px;">
                    <tr style="background-color: #f9f9f9;">
                        <td width="35%" style="font-weight: bold; color: #333;">Name:</td>
                        <td style="color: #555;">{$ownerName}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #333;">Phone:</td>
                        <td style="color: #555;"><a href="tel:{$contactNumber}" style="color: #0033A0;">{$contactNumber}</a></td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; color: #333;">Email:</td>
                        <td style="color: #555;"><a href="mailto:{$ownerEmail}" style="color: #0033A0;">{$ownerEmail}</a></td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Vehicle Information -->
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0033A0; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #E6F0FF; padding-bottom: 10px;">
                    🚙 Vehicle Details
                </h2>
                <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px;">
                    <tr style="background-color: #f9f9f9;">
                        <td width="35%" style="font-weight: bold; color: #333;">Make:</td>
                        <td style="color: #555;">{$vehicleMake}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #333;">Model:</td>
                        <td style="color: #555; font-weight: bold;">{$vehicleModel}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; color: #333;">Year:</td>
                        <td style="color: #555;">{$vehicleYear}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #333;">Mileage:</td>
                        <td style="color: #555;">{$vehicleMileage} KM</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; color: #333;">Condition:</td>
                        <td style="color: #555;">{$vehicleCondition}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #333;">Asking Price:</td>
                        <td style="color: #0033A0; font-weight: bold;">{$askingPrice}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="font-weight: bold; color: #333;">Photos Attached:</td>
                        <td style="color: #555;">{$imageCount} image(s)</td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Description -->
        <tr>
            <td style="padding: 20px;">
                <h2 style="color: #0033A0; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #E6F0FF; padding-bottom: 10px;">
                    📝 Vehicle Description
                </h2>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; font-size: 14px; color: #555; line-height: 1.6;">
                    {$vehicleDescription}
                </div>
            </td>
        </tr>
        
        <!-- Quick Actions -->
        <tr>
            <td style="padding: 20px; text-align: center;">
                <a href="https://wa.me/{$contactNumber}?text=Hello%20{$ownerName},%20regarding%20your%20{$vehicleYear}%20{$vehicleModel}%20submission%20({$submissionId})..." 
                   style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
                    💬 WhatsApp Owner
                </a>
                <a href="mailto:{$ownerEmail}?subject=RE:%20Vehicle%20Submission%20{$submissionId}" 
                   style="display: inline-block; background-color: #0033A0; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 5px;">
                    ✉️ Email Owner
                </a>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #333; padding: 20px; text-align: center;">
                <p style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">Zaza Rush Subaru</p>
                <p style="color: #999; margin: 0; font-size: 12px;">
                    Submitted: {$submittedDate}<br>
                    IP Address: {$ip}
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
}
