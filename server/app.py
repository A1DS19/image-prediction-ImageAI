from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from ml_brain import Ml_brain
from PIL import Image

app = Flask(__name__)
brain = Ml_brain()
cors = CORS(app)


@app.route("/eval-img", methods=["POST"])
@cross_origin()
def evaluate_image():
    img = request.files.get("file")
    pil_img = Image.open(img)
    pil_img.save("img.jpg")
    result = brain.run("img.jpg")
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
