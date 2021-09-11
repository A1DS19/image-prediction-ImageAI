from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image
from ml_brain import Ml_brain


app = Flask(__name__)
brain = Ml_brain()
CORS(app)


@app.route("/eval-img", methods=["POST"])
@cross_origin()
def evaluate_image():
    img = request.files.get("file")
    pil_img = Image.open(img)
    pil_img.save("img.jpg")
    result = brain.run("img.jpg")
    return jsonify(result)


@app.route("/test", methods=["GET"])
@cross_origin()
def test_app():
    return "HELLO WORLD"


if __name__ == "__main__":
    app.run(debug=True, port=5000)
