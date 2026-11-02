#!/usr/bin/env python3
import sys
import os

# Add current dir to python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from backend.app import get_db
from werkzeug.security import generate_password_hash

def main():
    print("========================================")
    print(" POLISH 925 — Admin User Setup Tool ")
    print("========================================")
    
    username = input("Enter Admin Username [e.g. alphakipkorir]: ").strip()
    if not username:
        print("Error: Username cannot be blank.")
        return

    full_name = input("Enter Full Name [e.g. Alpha Kipkorir]: ").strip() or username
    email = input("Enter Email [e.g. alpha@polish925.co.ke]: ").strip() or f"{username}@polish925.co.ke"
    password = input("Enter Password: ").strip()
    if not password:
        print("Error: Password cannot be blank.")
        return

    password_hash = generate_password_hash(password)

    conn = get_db()
    cursor = conn.cursor()
    
    # Check if user already exists
    cursor.execute("SELECT id FROM admins WHERE LOWER(username) = ?", (username.lower(),))
    existing = cursor.fetchone()

    if existing:
        cursor.execute("""
            UPDATE admins 
            SET password_hash = ?, full_name = ?, email = ?
            WHERE id = ?
        """, (password_hash, full_name, email, existing["id"]))
        print(f"\n✅ Existing admin user '{username}' has been updated with your new password!")
    else:
        cursor.execute("""
            INSERT INTO admins (username, email, password_hash, full_name)
            VALUES (?, ?, ?, ?)
        """, (username, email, password_hash, full_name))
        print(f"\n✅ New admin user '{username}' successfully registered!")

    conn.commit()
    conn.close()
    print("You can now login at http://127.0.0.1:5000 via the Admin Portal.\n")

if __name__ == "__main__":
    main()
