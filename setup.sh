#!/bin/bash

echo "🚀 InnoGalaxy Setup Script"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing frontend dependencies..."
    npm install
    
    print_status "Installing backend dependencies..."
    cd backend && npm install && cd ..
    
    print_success "All dependencies installed!"
}

# Build backend
build_backend() {
    print_status "Building backend..."
    cd backend && npm run build && cd ..
    print_success "Backend built successfully!"
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p backend/uploads
    mkdir -p assets/images
    print_success "Directories created!"
}

# Check if Expo CLI is installed
check_expo() {
    if command -v expo >/dev/null 2>&1; then
        EXPO_VERSION=$(expo --version)
        print_success "Expo CLI is installed: $EXPO_VERSION"
    else
        print_warning "Expo CLI not found. Installing globally..."
        npm install -g @expo/cli
        print_success "Expo CLI installed!"
    fi
}

# Check if EAS CLI is installed
check_eas() {
    if command -v eas >/dev/null 2>&1; then
        EAS_VERSION=$(eas --version)
        print_success "EAS CLI is installed: $EAS_VERSION"
    else
        print_warning "EAS CLI not found. Installing globally..."
        npm install -g eas-cli
        print_success "EAS CLI installed!"
    fi
}

# Start MongoDB (if available)
start_mongodb() {
    if command -v mongod >/dev/null 2>&1; then
        print_status "Starting MongoDB..."
        # This will vary based on the system
        if [[ "$OSTYPE" == "darwin"* ]]; then
            brew services start mongodb-community
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            sudo systemctl start mongod
        fi
        print_success "MongoDB started (if installed)!"
    else
        print_warning "MongoDB not found. The app will use fallback data."
    fi
}

# Main setup function
main() {
    echo ""
    print_status "Starting InnoGalaxy setup..."
    echo ""
    
    check_node
    check_npm
    check_expo
    check_eas
    create_directories
    install_dependencies
    build_backend
    start_mongodb
    
    echo ""
    print_success "🎉 Setup completed successfully!"
    echo ""
    print_status "Available commands:"
    echo "  npm run start:services    - Start both frontend and backend"
    echo "  npm run dev              - Start frontend only"
    echo "  npm run start:backend    - Start backend only"
    echo "  npm run build:apk        - Build APK file"
    echo "  npm run build:android    - Build Android app"
    echo ""
    print_status "To start the application:"
    echo "  npm run start:services"
    echo ""
}

# Run main function
main