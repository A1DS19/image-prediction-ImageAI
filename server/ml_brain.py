from imageai.Prediction import ImagePrediction
import os

# works?


class Ml_brain:
    def __init__(self):
        self.execution_path = os.getcwd()
        self.prediction = ImagePrediction()
        self.prediction.setModelTypeAsSqueezeNet()  # Model
        self.prediction.setModelPath(
            os.path.join(
                self.execution_path,
                "squeezenet_weights_tf_dim_ordering_tf_kernels.h5",
            )
        )
        self.prediction.loadModel()

    def predict(self, image):
        predictions, probabilities = self.prediction.predictImage(
            os.path.join(self.execution_path, image), result_count=5
        )
        return predictions, probabilities

    def results(self, predictions, probabilities):
        result = []
        for eachPrediction, eachProbability in zip(predictions, probabilities):
            result.append({eachPrediction: eachProbability})
            # print(eachPrediction, " : ", eachProbability)
        return result

    def run(self, image):
        predictions, probabilities = self.predict(image)
        return self.results(predictions, probabilities)
