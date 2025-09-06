#!/usr/bin/env python3
"""Comprehensive diagnostic script for upload issues."""

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

def test_cors_headers():
    """Test CORS headers from the backend."""
    print("=== Testing CORS Headers ===")
    
    try:
        # Test OPTIONS request (preflight)
        response = requests.options("http://127.0.0.1:8000/api/upload", 
                                  headers={
                                      "Origin": "http://localhost:5173",
                                      "Access-Control-Request-Method": "POST",
                                      "Access-Control-Request-Headers": "Content-Type"
                                  })
        
        print(f"OPTIONS Status: {response.status_code}")
        print("CORS Headers:")
        for header, value in response.headers.items():
            if "access-control" in header.lower():
                print(f"  {header}: {value}")
        
        return response.status_code == 200
        
    except Exception as e:
        print(f"❌ CORS test failed: {e}")
        return False

def test_upload_with_different_formats():
    """Test upload with different file formats."""
    print("\n=== Testing Different File Formats ===")
    
    test_files = [
        ("test.txt", "text/plain", "John Doe\nSoftware Engineer\njohn@email.com"),
        ("test.pdf", "application/pdf", None),  # Skip PDF for now
        ("test.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", None)  # Skip DOCX for now
    ]
    
    for filename, content_type, content in test_files:
        if content is None:
            print(f"⏭️  Skipping {filename} (binary format)")
            continue
            
        print(f"\nTesting {filename}...")
        
        try:
            # Create test file
            with open(filename, "w", encoding="utf-8") as f:
                f.write(content)
            
            # Test upload
            with open(filename, "rb") as f:
                files = {"file": (filename, f, content_type)}
                response = requests.post("http://127.0.0.1:8000/api/upload", files=files)
            
            print(f"  Status: {response.status_code}")
            if response.status_code == 200:
                print(f"  ✅ Success: {response.json()}")
            else:
                print(f"  ❌ Failed: {response.text}")
            
            # Clean up
            os.remove(filename)
            
        except Exception as e:
            print(f"  ❌ Error: {e}")
            if os.path.exists(filename):
                os.remove(filename)

def test_large_file():
    """Test with a larger file to check for size limits."""
    print("\n=== Testing Large File ===")
    
    # Create a larger test file
    large_content = "John Doe\nSoftware Engineer\n" * 1000  # ~25KB
    filename = "large_test.txt"
    
    try:
        with open(filename, "w", encoding="utf-8") as f:
            f.write(large_content)
        
        with open(filename, "rb") as f:
            files = {"file": (filename, f, "text/plain")}
            response = requests.post("http://127.0.0.1:8000/api/upload", files=files)
        
        print(f"Large file upload status: {response.status_code}")
        if response.status_code == 200:
            print("✅ Large file upload successful")
        else:
            print(f"❌ Large file upload failed: {response.text}")
        
        os.remove(filename)
        
    except Exception as e:
        print(f"❌ Large file test error: {e}")
        if os.path.exists(filename):
            os.remove(filename)

def test_malformed_requests():
    """Test with malformed requests to see error handling."""
    print("\n=== Testing Error Handling ===")
    
    # Test without file
    try:
        response = requests.post("http://127.0.0.1:8000/api/upload")
        print(f"No file status: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"No file test error: {e}")
    
    # Test with empty file
    try:
        files = {"file": ("empty.txt", b"", "text/plain")}
        response = requests.post("http://127.0.0.1:8000/api/upload", files=files)
        print(f"Empty file status: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Empty file test error: {e}")

def main():
    print("=== Resumind Upload Diagnostic Tool ===\n")
    
    # Test CORS
    cors_ok = test_cors_headers()
    
    # Test different formats
    test_upload_with_different_formats()
    
    # Test large file
    test_large_file()
    
    # Test error handling
    test_malformed_requests()
    
    print("\n=== Diagnostic Complete ===")
    
    if cors_ok:
        print("✅ CORS appears to be configured correctly")
    else:
        print("❌ CORS issues detected - this might be the problem!")

if __name__ == "__main__":
    main()
