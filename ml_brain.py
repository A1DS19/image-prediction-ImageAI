from imageai.Prediction import ImagePrediction
import os


class Ml_brain:
    def __init__(self, image_path):
        self.image = image_path
        self.execution_path = os.getcwd()
        self.prediction = ImagePrediction()
        self.prediction.setModelTypeAsSqueezeNet()  # Model
        self.prediction.setModelPath(
            os.path.join(
                self.execution_path, "squeezenet_weights_tf_dim_ordering_tf_kernels.h5"
            )
        )
        self.prediction.loadModel()

    # returns 5 possibilities
    def predict(self):
        predictions, probabilities = self.prediction.predictImage(
            os.path.join(self.execution_path, self.image), result_count=5
        )
        return predictions, probabilities

    def results(self, predictions, probabilities):
        for eachPrediction, eachProbability in zip(predictions, probabilities):
            print(eachPrediction, " : ", eachProbability)

    def run(self):
        predictions, probabilities = self.predict()
        self.results(predictions, probabilities)


brain = Ml_brain("./img/giraffe.jpg")
brain.run()
