async function runSimulation() {
  const gl1 = parseFloat(document.getElementById("gl1").value);
  const gl2 = parseFloat(document.getElementById("gl2").value);
  const gl3 = parseFloat(document.getElementById("gl3").value);
  const gl4 = parseFloat(document.getElementById("gl4").value);

  const code = `
import numpy as np
from scipy.linalg import block_diag
import matplotlib.pyplot as plt

class Magnet:
    def __init__(self, l, k, apt):
        self.update(l, k, apt)
        self.elemType = 'Quadrupole'

    def update(self, l, k, apt):
        self.aperture = apt
        self.k = k
        self.length = l

        sqrtk = abs(k) ** 0.5
        R11 = np.cos(l * sqrtk )
        R12 = sqrtk**-1  * np.sin(l * sqrtk )
        R21 = -sqrtk  * np.sin(l * sqrtk )
        R22 = np.cos(l * sqrtk )
        self.Rx = np.matrix([[R11, R12], [R21, R22]])

class Drift:
    def __init__(self, l):
        self.update(l)
        self.elemType = 'Drift'

    def update(self, l):
        self.length = l
        self.Rx = np.matrix([[1, l], [0,1]])

momentum = 400
def db_to_k(gradient, momentum):
    return gradient * 0.2998 / momentum

lqnl = 2.99
lqwl = 2.948

# Inject JavaScript values as Python code
k1fit = db_to_k(${gl1}, momentum)
k2fit = db_to_k(${gl2}, momentum)
k3fit = db_to_k(${gl3}, momentum)
k4fit = db_to_k(${gl4}, momentum)

m1 = Magnet(lqnl, k1fit, [0.05, 0.05])
d1 = Drift(44.175)
m2 = Magnet(lqnl, k2fit, [0.05, 0.05])
d2 = Drift(6.78)
m3 = Magnet(lqwl, k3fit, [0.04, 0.04])
d3 = Drift(9.52)
m4 = Magnet(lqwl, k4fit, [0.04, 0.04])
d4 = Drift(10.86)

listElements = [m1, d1, m2, d2, m3, d3, m4, d4]

def calculateR(listElements):
    productR = [np.eye(2)]
    for elem in listElements:
        productR.append(elem.Rx @ productR[-1])
    return productR

R_matrices = calculateR(listElements)

# Prepare results to display
results = {
    "gl1": ${gl1},
    "gl2": ${gl2},
    "gl3": ${gl3},
    "gl4": ${gl4},
    "R_matrices": [R.tolist() for R in R_matrices]
}
results
    `;

  const output = await pyodide.runPythonAsync(code);
  document.getElementById("result").innerText = JSON.stringify(output, null, 2);

  // Plotting on canvas (example)
  const canvas = document.getElementById("plot");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, 200);
  for (let i = 0; i < output.R_matrices.length; i++) {
    let y = 200 - output.R_matrices[i][0][0] * 100;
    ctx.lineTo(i * (800 / output.R_matrices.length), y);
  }
  ctx.stroke();
}
