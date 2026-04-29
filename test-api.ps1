# Yandex Telemost API Test Script (PowerShell)
# Usage: .\test-api.ps1 -Command <command> [-Arg1 <value>] [-Arg2 <value>]

param(
    [Parameter(Mandatory=$false)]
    [string]$Command = "help",
    
    [Parameter(Mandatory=$false)]
    [string]$Arg1 = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Arg2 = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Arg3 = ""
)

$Global:BASE_URL = "http://localhost:3002"
$Global:TOKEN = ""

function Write-Step {
    param([string]$Message)
    Write-Host "==> $Message" -ForegroundColor Yellow
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Test login
function Test-Login {
    param([string]$Email = "admin@znanie.com", [string]$Password = "admin123")
    
    Write-Step "Testing Login API..."
    
    $body = @{
        email = $Email
        password = $Password
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$BASE_URL/api/auth/login" -Method POST -ContentType "application/json" -Body $body
    $responseJson = $response | ConvertTo-Json -Depth 10
    
    Write-Host "Response: $responseJson"
    
    if ($response.token) {
        $Global:TOKEN = $response.token
        Write-Success "Login successful! Token obtained."
        Write-Host "Token: $($TOKEN.Substring(0, [Math]::Min(50, $TOKEN.Length)))..."
    } else {
        Write-Error "Login failed!"
    }
}

# Test auth/me
function Test-AuthMe {
    Write-Step "Testing Auth/Me API..."
    
    try {
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/auth/me" -Method GET -WebSession (New-Object Microsoft.PowerShell.Commands.WebRequestSession) -Headers @{"Cookie"="auth-token=$TOKEN"}
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        Write-Success "Auth check successful!"
    } catch {
        Write-Error "Auth check failed!"
    }
}

# Test get meetings
function Test-GetMeetings {
    Write-Step "Testing GET /api/meetings..."
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/meetings" -Method GET -CookieContainer $cookies
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        Write-Success "GET meetings successful!"
    } catch {
        Write-Error "GET meetings failed!"
    }
}

# Test create meeting
function Test-CreateMeeting {
    param([string]$TeacherId = "", [string]$Title = "Test Meeting")
    
    Write-Step "Testing POST /api/meetings (Create Meeting)..."
    
    $startTime = (Get-Date).AddHours(1).ToString("o")
    $endTime = (Get-Date).AddHours(2).ToString("o")
    
    $body = @{
        teacherId = $TeacherId
        title = $Title
        description = "Test meeting created via API"
        startTime = $startTime
        endTime = $endTime
        timezone = "Asia/Kolkata"
    } | ConvertTo-Json
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/meetings" -Method POST -ContentType "application/json" -CookieContainer $cookies -Body $body
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        
        if ($response.meeting) {
            Write-Success "Meeting created!"
            $Global:LAST_MEETING_ID = $response.meeting.id
            Write-Host "Meeting ID: $LAST_MEETING_ID"
        } else {
            Write-Error "Meeting creation failed!"
        }
    } catch {
        Write-Error "Meeting creation failed: $_"
    }
}

# Test create meeting (teacher endpoint)
function Test-CreateMeetingTeacher {
    param([string]$StudentId = "", [string]$Title = "Teacher Meeting")
    
    Write-Step "Testing POST /api/meetings/teacher (Create Meeting as Teacher)..."
    
    $startTime = (Get-Date).AddHours(1).ToString("o")
    $endTime = (Get-Date).AddHours(2).ToString("o")
    
    $body = @{
        studentId = $StudentId
        title = $Title
        description = "Test meeting from teacher endpoint"
        startTime = $startTime
        endTime = $endTime
        meetingType = "ONE_ON_ONE"
    } | ConvertTo-Json
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/meetings/teacher" -Method POST -ContentType "application/json" -CookieContainer $cookies -Body $body
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        
        if ($response.meeting) {
            Write-Success "Meeting created via teacher endpoint!"
        } else {
            Write-Error "Meeting creation failed!"
        }
    } catch {
        Write-Error "Meeting creation failed: $_"
    }
}

# Test get single meeting
function Test-GetMeeting {
    param([string]$MeetingId = "")
    
    if ([string]::IsNullOrEmpty($MeetingId)) {
        $MeetingId = $Global:LAST_MEETING_ID
    }
    
    if ([string]::IsNullOrEmpty($MeetingId)) {
        Write-Error "No meeting ID provided!"
        return
    }
    
    Write-Step "Testing GET /api/meetings/$MeetingId..."
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/meetings/$MeetingId" -Method GET -CookieContainer $cookies
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        Write-Success "GET meeting successful!"
    } catch {
        Write-Error "GET meeting failed!"
    }
}

# Test cancel meeting
function Test-CancelMeeting {
    param([string]$MeetingId = "")
    
    if ([string]::IsNullOrEmpty($MeetingId)) {
        $MeetingId = $Global:LAST_MEETING_ID
    }
    
    if ([string]::IsNullOrEmpty($MeetingId)) {
        Write-Error "No meeting ID provided!"
        return
    }
    
    Write-Step "Testing DELETE /api/meetings/$MeetingId (Cancel Meeting)..."
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/meetings/$MeetingId" -Method DELETE -CookieContainer $cookies
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        
        if ($response.message) {
            Write-Success "Meeting cancelled!"
        } else {
            Write-Error "Cancel meeting failed!"
        }
    } catch {
        Write-Error "Cancel meeting failed: $_"
    }
}

# Test admin stats
function Test-AdminStats {
    Write-Step "Testing GET /api/admin/stats..."
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/admin/stats" -Method GET -CookieContainer $cookies
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        Write-Success "Admin stats retrieved!"
    } catch {
        Write-Error "Admin stats failed!"
    }
}

# Test admin users
function Test-AdminUsers {
    Write-Step "Testing GET /api/admin/users..."
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/admin/users" -Method GET -CookieContainer $cookies
        $responseJson = $response | ConvertTo-Json -Depth 10
        
        if ($responseJson.Length -gt 500) {
            Write-Host "Response (first 500 chars): $($responseJson.Substring(0, 500))..."
        } else {
            Write-Host "Response: $responseJson"
        }
        Write-Success "Admin users retrieved!"
    } catch {
        Write-Error "Admin users failed!"
    }
}

# Test admin create user
function Test-AdminCreateUser {
    param([string]$Name = "Test User", [string]$Email = "", [string]$Role = "STUDENT")
    
    if ([string]::IsNullOrEmpty($Email)) {
        $Email = "test$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
    }
    
    Write-Step "Testing POST /api/admin/users (Create User)..."
    
    $body = @{
        name = $Name
        email = $Email
        password = "test123"
        role = $Role
    } | ConvertTo-Json
    
    try {
        $cookies = New-Object System.Net.CookieContainer
        $cookies.Add([System.Uri]::new("$BASE_URL"), [System.Net.Cookie]::new("auth-token", $TOKEN))
        
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/admin/users" -Method POST -ContentType "application/json" -CookieContainer $cookies -Body $body
        $responseJson = $response | ConvertTo-Json -Depth 10
        Write-Host "Response: $responseJson"
        
        if ($response.user) {
            Write-Success "User created!"
        } else {
            Write-Error "User creation failed!"
        }
    } catch {
        Write-Error "User creation failed: $_"
    }
}

# Full test suite
function Run-FullTest {
    Write-Host ""
    Write-Host "=== Yandex Telemost API Full Test Suite ===" -ForegroundColor Green
    Write-Host ""
    
    Write-Step "1. Testing Login..."
    Test-Login "admin@znanie.com" "admin123"
    
    if ([string]::IsNullOrEmpty($Global:TOKEN)) {
        Write-Error "Cannot proceed without token. Exiting."
        exit 1
    }
    
    Write-Host ""
    Write-Step "2. Testing Auth/Me..."
    Test-AuthMe
    
    Write-Host ""
    Write-Step "3. Testing GET Meetings..."
    Test-GetMeetings
    
    Write-Host ""
    Write-Step "4. Testing Admin Stats..."
    Test-AdminStats
    
    Write-Host ""
    Write-Step "5. Testing Admin Users..."
    Test-AdminUsers
    
    Write-Host ""
    Write-Host "=== Test Suite Complete ===" -ForegroundColor Green
}

# Print usage
function Show-Help {
    Write-Host ""
    Write-Host "Usage: .\test-api.ps1 -Command <command> [-Arg1 <value>] [-Arg2 <value>] [-Arg3 <value>]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Cyan
    Write-Host "  login                    - Test login API"
    Write-Host "  auth                    - Test auth/me API"
    Write-Host "  meetings                - Test GET meetings"
    Write-Host "  create                  - Test create meeting"
    Write-Host "  create-teacher          - Test create meeting (teacher endpoint)"
    Write-Host "  get                     - Test GET single meeting"
    Write-Host "  cancel                  - Test cancel meeting"
    Write-Host "  admin-stats             - Test admin stats"
    Write-Host "  admin-users             - Test admin users list"
    Write-Host "  admin-create            - Test admin create user"
    Write-Host "  all                     - Run full test suite"
    Write-Host "  help                    - Show this help"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host '  .\test-api.ps1 -Command login'
    Write-Host '  .\test-api.ps1 -Command create -Arg1 "teacher_id" -Arg2 "My Meeting"'
    Write-Host '  .\test-api.ps1 -Command cancel -Arg1 "meeting_id"'
    Write-Host '  .\test-api.ps1 -Command all'
    Write-Host ""
}

# Main - Execute command
switch ($Command.ToLower()) {
    "login" { Test-Login $Arg1 $Arg2 }
    "auth" { Test-AuthMe }
    "meetings" { Test-GetMeetings }
    "create" { Test-CreateMeeting $Arg1 $Arg2 }
    "create-teacher" { Test-CreateMeetingTeacher $Arg1 $Arg2 }
    "get" { Test-GetMeeting $Arg1 }
    "cancel" { Test-CancelMeeting $Arg1 }
    "admin-stats" { Test-AdminStats }
    "admin-users" { Test-AdminUsers }
    "admin-create" { Test-AdminCreateUser $Arg1 $Arg2 $Arg3 }
    "all" { Run-FullTest }
    default { Show-Help }
}