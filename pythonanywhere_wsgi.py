# PYTHONANYWHERE WSGI CONFIGURATION FILE FOR POLISH 925

import sys
import os

# Define your project folder path on PythonAnywhere
# Replace 'YOUR_USERNAME' with your actual PythonAnywhere username:
username = 'YOUR_USERNAME'
project_home = f'/home/{username}/Polish925'

if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Import the Flask app
from backend.app import app as application
