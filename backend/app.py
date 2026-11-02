import os
import sqlite3
import uuid
import secrets
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "polish925.db")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__, static_folder="../", static_url_path="")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB max upload

# Active in-memory session tokens: {token: username}
ADMIN_SESSIONS = {}

# Simple CORS support without third-party dependencies
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Admins table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT,
            password_hash TEXT NOT NULL,
            full_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Products table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            specs TEXT,
            rating REAL DEFAULT 5.0,
            price REAL NOT NULL,
            old_price REAL,
            badge TEXT,
            image TEXT,
            featured INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Bookings table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            jewelry_type TEXT NOT NULL,
            material TEXT NOT NULL,
            service TEXT NOT NULL,
            preferred_date TEXT,
            preferred_time TEXT,
            full_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT,
            location_notes TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Create default authorized admin if none exists
    cursor.execute("SELECT COUNT(*) as count FROM admins")
    if cursor.fetchone()["count"] == 0:
        default_admin_pass = generate_password_hash("polish925admin")
        cursor.execute("""
            INSERT INTO admins (username, email, password_hash, full_name)
            VALUES (?, ?, ?, ?)
        """, ("admin", "admin@polish925.co.ke", default_admin_pass, "Store Manager"))

    # Seed default products if empty
    cursor.execute("SELECT COUNT(*) as count FROM products")
    if cursor.fetchone()["count"] == 0:
        default_products = [
            (
                "925 Sterling Silver Ring",
                "925 Silver",
                "925 Silver • 4.2g",
                4.8,
                3500,
                4200,
                "Best Seller",
                "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
                1
            ),
            (
                "Gold Plated Chain",
                "Gold",
                "18K Gold • 8.1g",
                5.0,
                7200,
                None,
                "New",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
                1
            ),
            (
                "Silver Charm Bracelet",
                "925 Silver",
                "925 Silver • 6.5g",
                4.2,
                4800,
                6000,
                "-20%",
                "https://images.unsplash.com/photo-1611591475759-3d7c71d62057?auto=format&fit=crop&w=600&q=80",
                1
            ),
            (
                "Gold Wedding Band",
                "Gold",
                "14K Gold • 3.8g",
                4.9,
                9500,
                None,
                "New",
                "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
                1
            ),
            (
                "Classic Silver Solitaire Ring",
                "925 Silver",
                "925 Silver • 3.5g",
                4.9,
                3800,
                4500,
                "Popular",
                "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
                0
            ),
            (
                "Vintage Gold Rope Chain",
                "Gold",
                "18K Yellow Gold • 12.0g",
                4.9,
                14500,
                16000,
                "Premium",
                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
                0
            )
        ]
        cursor.executemany("""
            INSERT INTO products (name, category, specs, rating, price, old_price, badge, image, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, default_products)

    conn.commit()
    conn.close()

init_db()

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def is_authorized(req):
    auth_header = req.headers.get("Authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ", 1)[1].strip()
    elif "token" in req.args:
        token = req.args.get("token")
    elif req.is_json and req.get_json():
        token = req.get_json().get("token")

    if token and token in ADMIN_SESSIONS:
        return True, ADMIN_SESSIONS[token]
    return False, None

# Serve frontend root
@app.route("/")
def index():
    return send_from_directory(os.path.join(BASE_DIR, ".."), "index.html")

# Serve uploaded images
@app.route("/uploads/<filename>")
def serve_upload(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Serve static assets (posters, banners, logos)
@app.route("/assets/<path:filename>")
def serve_asset(filename):
    return send_from_directory(os.path.join(BASE_DIR, "..", "assets"), filename)

# ----------------- ADMIN AUTHENTICATION ----------------- #

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json() or request.form.to_dict() or {}
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admins WHERE LOWER(username) = ? OR LOWER(email) = ?", (username.lower(), username.lower()))
    admin = cursor.fetchone()
    conn.close()

    if not admin or not check_password_hash(admin["password_hash"], password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Issue session token
    token = secrets.token_hex(24)
    ADMIN_SESSIONS[token] = {
        "id": admin["id"],
        "username": admin["username"],
        "email": admin["email"],
        "full_name": admin["full_name"]
    }

    return jsonify({
        "success": True,
        "token": token,
        "admin": {
            "username": admin["username"],
            "full_name": admin["full_name"],
            "email": admin["email"]
        }
    })

@app.route("/api/admin/verify", methods=["GET"])
def admin_verify():
    authorized, admin_info = is_authorized(request)
    if not authorized:
        return jsonify({"authenticated": False}), 401
    return jsonify({"authenticated": True, "admin": admin_info})

@app.route("/api/admin/logout", methods=["POST"])
def admin_logout():
    auth_header = request.headers.get("Authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ", 1)[1].strip()
    if token and token in ADMIN_SESSIONS:
        del ADMIN_SESSIONS[token]
    return jsonify({"success": True})

@app.route("/api/admin/change-credentials", methods=["POST"])
def change_credentials():
    authorized, admin_info = is_authorized(request)
    if not authorized:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json() or {}
    new_username = data.get("new_username", "").strip()
    new_password = data.get("new_password", "").strip()
    new_full_name = data.get("new_full_name", "").strip()

    conn = get_db()
    cursor = conn.cursor()
    admin_id = admin_info["id"]

    if new_username:
        cursor.execute("UPDATE admins SET username = ? WHERE id = ?", (new_username, admin_id))
        admin_info["username"] = new_username
    if new_full_name:
        cursor.execute("UPDATE admins SET full_name = ? WHERE id = ?", (new_full_name, admin_id))
        admin_info["full_name"] = new_full_name
    if new_password:
        hashed = generate_password_hash(new_password)
        cursor.execute("UPDATE admins SET password_hash = ? WHERE id = ?", (hashed, admin_id))

    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Credentials updated successfully", "admin": admin_info})

# ----------------- PRODUCT APIS ----------------- #

@app.route("/api/products", methods=["GET"])
def get_products():
    category = request.args.get("category")
    conn = get_db()
    cursor = conn.cursor()
    if category and category.lower() != "all":
        cursor.execute("SELECT * FROM products WHERE LOWER(category) LIKE ? ORDER BY id DESC", (f"%{category.lower()}%",))
    else:
        cursor.execute("SELECT * FROM products ORDER BY id DESC")
    rows = cursor.fetchall()
    products = [dict(row) for row in rows]
    conn.close()
    return jsonify(products)

@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(dict(row))

@app.route("/api/products", methods=["POST"])
def create_product():
    # Only authenticated admin can add products
    authorized, _ = is_authorized(request)
    if not authorized:
        return jsonify({"error": "Admin login required to add products"}), 401

    data = request.form.to_dict() if request.form else (request.get_json() or {})
    
    name = data.get("name", "").strip()
    category = data.get("category", "925 Silver").strip()
    specs = data.get("specs", "").strip()
    badge = data.get("badge", "").strip()
    image_url = data.get("image", "").strip()
    
    try:
        price = float(data.get("price", 0))
    except (ValueError, TypeError):
        price = 0.0

    try:
        old_price = float(data.get("old_price")) if data.get("old_price") else None
    except (ValueError, TypeError):
        old_price = None

    try:
        rating = float(data.get("rating", 5.0))
    except (ValueError, TypeError):
        rating = 5.0

    featured = 1 if str(data.get("featured", "1")).lower() in ("1", "true") else 0

    if "image_file" in request.files:
        file = request.files["image_file"]
        if file and allowed_file(file.filename):
            ext = file.filename.rsplit(".", 1)[1].lower()
            unique_filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(UPLOAD_FOLDER, unique_filename))
            image_url = f"/uploads/{unique_filename}"

    if not name or price <= 0:
        return jsonify({"error": "Name and valid price are required"}), 400

    if not image_url:
        image_url = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO products (name, category, specs, rating, price, old_price, badge, image, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (name, category, specs, rating, price, old_price, badge, image_url, featured))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({"success": True, "id": new_id, "message": "Product created successfully"}), 201

@app.route("/api/products/<int:product_id>", methods=["PUT", "POST"])
def update_product(product_id):
    # Only authenticated admin can update products
    authorized, _ = is_authorized(request)
    if not authorized:
        return jsonify({"error": "Admin login required to update products"}), 401

    data = request.form.to_dict() if request.form else (request.get_json() or {})
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    current = cursor.fetchone()
    if not current:
        conn.close()
        return jsonify({"error": "Product not found"}), 404

    name = data.get("name", current["name"]).strip()
    category = data.get("category", current["category"]).strip()
    specs = data.get("specs", current["specs"]).strip()
    badge = data.get("badge", current["badge"]).strip()
    image_url = data.get("image", current["image"]).strip()

    try:
        price = float(data.get("price", current["price"]))
    except (ValueError, TypeError):
        price = current["price"]

    try:
        if "old_price" in data:
            old_price = float(data.get("old_price")) if data.get("old_price") else None
        else:
            old_price = current["old_price"]
    except (ValueError, TypeError):
        old_price = None

    try:
        rating = float(data.get("rating", current["rating"]))
    except (ValueError, TypeError):
        rating = current["rating"]

    featured = 1 if str(data.get("featured", current["featured"])).lower() in ("1", "true") else 0

    if "image_file" in request.files:
        file = request.files["image_file"]
        if file and allowed_file(file.filename):
            ext = file.filename.rsplit(".", 1)[1].lower()
            unique_filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(UPLOAD_FOLDER, unique_filename))
            image_url = f"/uploads/{unique_filename}"

    cursor.execute("""
        UPDATE products 
        SET name = ?, category = ?, specs = ?, rating = ?, price = ?, old_price = ?, badge = ?, image = ?, featured = ?
        WHERE id = ?
    """, (name, category, specs, rating, price, old_price, badge, image_url, featured, product_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Product updated successfully"})

@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    authorized, _ = is_authorized(request)
    if not authorized:
        return jsonify({"error": "Admin login required to delete products"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Product deleted successfully"})

# ----------------- BOOKINGS API ----------------- #

@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    authorized, _ = is_authorized(request)
    if not authorized:
        return jsonify({"error": "Admin login required to view customer bookings"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings ORDER BY id DESC")
    rows = cursor.fetchall()
    bookings = [dict(row) for row in rows]
    conn.close()
    return jsonify(bookings)

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json() or request.form.to_dict() or {}
    jewelry_type = data.get("jewelry_type", "Ring")
    material = data.get("material", "925 Sterling Silver")
    service = data.get("service", "Polishing")
    preferred_date = data.get("preferred_date", "")
    preferred_time = data.get("preferred_time", "")
    full_name = data.get("full_name", "").strip()
    phone = data.get("phone", "").strip()
    email = data.get("email", "").strip()
    location_notes = data.get("location_notes", "").strip()

    if not full_name or not phone:
        return jsonify({"error": "Full name and phone are required"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO bookings (jewelry_type, material, service, preferred_date, preferred_time, full_name, phone, email, location_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (jewelry_type, material, service, preferred_date, preferred_time, full_name, phone, email, location_notes))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({"success": True, "id": new_id, "message": "Booking received"}), 201

@app.route("/api/bookings/<int:booking_id>/status", methods=["PUT", "POST"])
def update_booking_status(booking_id):
    authorized, _ = is_authorized(request)
    if not authorized:
        return jsonify({"error": "Admin login required to update booking status"}), 401

    data = request.get_json() or {}
    new_status = data.get("status", "completed")
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE bookings SET status = ? WHERE id = ?", (new_status, booking_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "status": new_status})

if __name__ == "__main__":
    print(f"SILVER PLUG KENYA Server running at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
