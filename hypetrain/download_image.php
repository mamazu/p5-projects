<?php


function getOAuthToken(string $clientId, string $clientSecret): array {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://id.twitch.tv/oauth2/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "client_id=$clientId&client_secret=$clientSecret&grant_type=client_credentials");

    $headers = array();
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true);
}

function getCachedOAuthToken(string $clientId, string $clientSecret): string {
    global $authenticationCacheFile;
    if (file_exists($authenticationCacheFile)) {
        $contents = json_decode(file_get_contents($authenticationCacheFile), true);
        
        $validUntil = new DateTime($contents['requested']);
        $validUntil->modify('+ '.$contents['expires_in'] . ' seconds');
        var_dump($validUntil);
        
        if ($validUntil > new DateTime()) {
            return $contents['access_token'];
        }
    }

    $result = getOAuthToken($clientId, $clientSecret);
    $result['requested'] = date('Y-m-d H:i:s');

    file_put_contents($authenticationCacheFile, json_encode($result));
    return $result['access_token'];
}

function getImage(string $clientId, string $oauthToken, string $username): array {
    $url = "https://api.twitch.tv/helix/users?login=".$username;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $headers = array(
        "Authorization: Bearer iys4s8ks4bhavlakr3qveb417s33c2",
        "Client-Id: $clientId",
    );
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// ----------------------- MAIN PROGRAMM -----------------------------------
$username = $_GET['username'];

$clientId = "8hwmkq0p8hyecvr27z0ztkrpz9apq8";
$clientSecret= "iw4ac4zgmjm8mrin6063wwewyhpy5r";
$authenticationCacheFile = 'authentiation.json';
$cacheDirectory = 'users';

header('Content-Type: image/png');
$imagePath = implode(DIRECTORY_SEPARATOR, [$cacheDirectory, $username.'.png']);
if (file_exists($imagePath)) {
    echo file_get_contents($imagePath);
    die();
}

$token = getCachedOAuthToken($clientId, $clientSecret);
$imageUrl = getImage($clientId, $token, $username)['data'][0]['profile_image_url'] ?? null;
if ($imageUrl !== null) {
    $imageContent = file_get_contents($imageUrl);
    file_put_contents($imagePath, $imageContent);
    echo $imageContent;
    die();
}

echo base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');