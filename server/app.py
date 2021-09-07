from flask import Flask, request
from flask_cors import CORS
import os
from ml_brain import Ml_brain
from PIL import Image
import io
import base64

app = Flask(__name__)
brain = Ml_brain()
CORS(app)

# Arreglar filepath para modelo


@app.route("/eval-img", methods=["POST"])
def evaluate_image():
    buff = io.BytesIO()
    file = request.files.get("file").read()
    print(brain.run(file))
    return "done"
