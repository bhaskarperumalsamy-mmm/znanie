#!/bin/bash

# Yandex Telemost API Test Script
# Usage: ./test-api.sh <endpoint> [method] [data]

BASE_URL="http://localhost:3002"
TOKEN=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_step() {
    echo -e "${YELLOW}==> $1${NC}"
}

echo_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

echo_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Test login and get token
test_login() {
    echo_step "Testing Login API..."
    
    local email=${1:-"admin@znanie.com"}
    local password=${2:-"admin123"}
    
    response=$(curl -s -X POST "$BASE_URL/api/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$email\",\"password\":\"$password\"}")
    
    echo "Response: $response"
    
    # Extract token from response
    TOKEN=$(echo $response | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$TOKEN" ]; then
        echo_success "Login successful! Token obtained."
        echo "Token: ${TOKEN:0:50}..."
    else
        echo_error "Login failed!"
        return 1
    fi
}

# Test auth/me endpoint
test_auth_me() {
    echo_step "Testing Auth/Me API..."
    
    response=$(curl -s -X GET "$BASE_URL/api/auth/me" \
        -H "Cookie: auth-token=$TOKEN")
    
    echo "Response: $response"
    
    if echo "$response" | grep -q '"user"'; then
        echo_success "Auth check successful!"
    else
        echo_error "Auth check failed!"
    fi
}

# Test get meetings
test_get_meetings() {
    echo_step "Testing GET /api/meetings..."
    
    response=$(curl -s -X GET "$BASE_URL/api/meetings" \
        -H "Cookie: auth-token=$TOKEN")
    
    echo "Response: $response"
    
    if [ $? -eq 0 ]; then
        echo_success "GET meetings successful!"
    else
        echo_error "GET meetings failed!"
    fi
}

# Test create meeting
test_create_meeting() {
    echo_step "Testing POST /api/meetings (Create Meeting)..."
    
    local teacher_id=${1:-""}
    local title=${2:-"Test Meeting"}
    
    response=$(curl -s -X POST "$BASE_URL/api/meetings" \
        -H "Content-Type: application/json" \
        -H "Cookie: auth-token=$TOKEN" \
        -d "{
            \"teacherId\": \"$teacher_id\",
            \"title\": \"$title\",
            \"description\": \"Test meeting created via API\",
            \"startTime\": \"$(date -d '+1 hour' -Iseconds)\",
            \"endTime\": \"$(date -d '+2 hours' -Iseconds)\",
            \"timezone\": \"Asia/Kolkata\"
        }")
    
    echo "Response: $response"
    
    if echo "$response" | grep -q '"meeting"'; then
        echo_success "Meeting created!"
        # Extract meeting ID for further tests
        MEETING_ID=$(echo $response | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
        echo "Meeting ID: $MEETING_ID"
    else
        echo_error "Meeting creation failed!"
    fi
}

# Test create meeting (teacher endpoint)
test_create_meeting_teacher() {
    echo_step "Testing POST /api/meetings/teacher (Create Meeting as Teacher)..."
    
    local student_id=${1:-""}
    local title=${2:-"Teacher Meeting"}
    
    response=$(curl -s -X POST "$BASE_URL/api/meetings/teacher" \
        -H "Content-Type: application/json" \
        -H "Cookie: auth-token=$TOKEN" \
        -d "{
            \"studentId\": \"$student_id\",
            \"title\": \"$title\",
            \"description\": \"Test meeting from teacher endpoint\",
            \"startTime\": \"$(date -d '+1 hour' -Iseconds)\",
            \"endTime\": \"$(date -d '+2 hours' -Iseconds)\",
            \"meetingType\": \"ONE_ON_ONE\"
        }")
    
    echo "Response: $response"
    
    if echo "$response" | grep -q '"meeting"'; then
        echo_success "Meeting created via teacher endpoint!"
    else
        echo_error "Meeting creation failed!"
    fi
}

# Test get single meeting
test_get_meeting() {
    echo_step "Testing GET /api/meetings/[id]..."
    
    local meeting_id=${1:-$MEETING_ID}
    
    if [ -z "$meeting_id" ]; then
        echo_error "No meeting ID provided!"
        return 1
    fi
    
    response=$(curl -s -X GET "$BASE_URL/api/meetings/$meeting_id" \
        -H "Cookie: auth-token=$TOKEN")
    
    echo "Response: $response"
    
    if [ $? -eq 0 ]; then
        echo_success "GET meeting successful!"
    else
        echo_error "GET meeting failed!"
    fi
}

# Test cancel meeting
test_cancel_meeting() {
    echo_step "Testing DELETE /api/meetings/[id] (Cancel Meeting)..."
    
    local meeting_id=${1:-$MEETING_ID}
    
    if [ -z "$meeting_id" ]; then
        echo_error "No meeting ID provided!"
        return 1
    fi
    
    response=$(curl -s -X DELETE "$BASE_URL/api/meetings/$meeting_id" \
        -H "Cookie: auth-token=$TOKEN")
    
    echo "Response: $response"
    
    if echo "$response" | grep -q '"message"'; then
        echo_success "Meeting cancelled!"
    else
        echo_error "Cancel meeting failed!"
    fi
}

# Test admin stats
test_admin_stats() {
    echo_step "Testing GET /api/admin/stats..."
    
    response=$(curl -s -X GET "$BASE_URL/api/admin/stats" \
        -H "Cookie: auth-token=$TOKEN")
    
    echo "Response: $response"
    
    if [ $? -eq 0 ]; then
        echo_success "Admin stats retrieved!"
    else
        echo_error "Admin stats failed!"
    fi
}

# Test admin users
test_admin_users() {
    echo_step "Testing GET /api/admin/users..."
    
    response=$(curl -s -X GET "$BASE_URL/api/admin/users" \
        -H "Cookie: auth-token=$TOKEN")
    
    echo "Response (first 500 chars): $(echo $response | cut -c1-500)"
    
    if [ $? -eq 0 ]; then
        echo_success "Admin users retrieved!"
    else
        echo_error "Admin users failed!"
    fi
}

# Test admin create user
test_admin_create_user() {
    echo_step "Testing POST /api/admin/users (Create User)..."
    
    local name=${1:-"Test User"}
    local email=${2:-"test$(date +%s)@example.com"}
    local role=${3:-"STUDENT"}
    
    response=$(curl -s -X POST "$BASE_URL/api/admin/users" \
        -H "Content-Type: application/json" \
        -H "Cookie: auth-token=$TOKEN" \
        -d "{
            \"name\": \"$name\",
            \"email\": \"$email\",
            \"password\": \"test123\",
            \"role\": \"$role\"
        }")
    
    echo "Response: $response"
    
    if echo "$response" | grep -q '"user"'; then
        echo_success "User created!"
    else
        echo_error "User creation failed!"
    fi
}

# Full test suite
run_full_test() {
    echo ""
    echo -e "${GREEN}=== Yandex Telemost API Full Test Suite ===${NC}"
    echo ""
    
    echo_step "1. Testing Login..."
    test_login "admin@znanie.com" "admin123"
    
    if [ -z "$TOKEN" ]; then
        echo_error "Cannot proceed without token. Exiting."
        exit 1
    fi
    
    echo ""
    echo_step "2. Testing Auth/Me..."
    test_auth_me
    
    echo ""
    echo_step "3. Testing GET Meetings..."
    test_get_meetings
    
    echo ""
    echo_step "4. Testing Admin Stats..."
    test_admin_stats
    
    echo ""
    echo_step "5. Testing Admin Users..."
    test_admin_users
    
    echo ""
    echo -e "${GREEN}=== Test Suite Complete ===${NC}"
}

# Print usage
usage() {
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  login                    - Test login API"
    echo "  auth                     - Test auth/me API"
    echo "  meetings                 - Test GET meetings"
    echo "  create                   - Test create meeting"
    echo "  create-teacher           - Test create meeting (teacher endpoint)"
    echo "  get <id>                 - Test GET single meeting"
    echo "  cancel <id>              - Test cancel meeting"
    echo "  admin-stats              - Test admin stats"
    echo "  admin-users              - Test admin users list"
    echo "  admin-create             - Test admin create user"
    echo "  all                      - Run full test suite"
    echo ""
    echo "Examples:"
    echo "  $0 login"
    echo "  $0 create teacher_id \"My Meeting\""
    echo "  $0 cancel meeting_id"
    echo "  $0 all"
}

# Main
case "${1:-}" in
    login)
        test_login "${2:-}" "${3:-}"
        ;;
    auth)
        test_auth_me
        ;;
    meetings)
        test_get_meetings
        ;;
    create)
        test_create_meeting "${2:-}" "${3:-}"
        ;;
    create-teacher)
        test_create_meeting_teacher "${2:-}" "${3:-}"
        ;;
    get)
        test_get_meeting "${2:-}"
        ;;
    cancel)
        test_cancel_meeting "${2:-}"
        ;;
    admin-stats)
        test_admin_stats
        ;;
    admin-users)
        test_admin_users
        ;;
    admin-create)
        test_admin_create_user "${2:-}" "${3:-}" "${4:-}"
        ;;
    all)
        run_full_test
        ;;
    *)
        usage
        exit 1
        ;;
esac