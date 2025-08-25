let network = {
    layerSizes: [2, 10, 10, 1],
    weights: [],
    biases: [],
    neurons: []
};

let weights_cnt = 0;
let biases_cnt = 0;

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function init() {
    for (let i = 0; i < network.layerSizes.length - 1; i++) {
        let rows = network.layerSizes[i + 1];
        let cols = network.layerSizes[i];
        network.weights[i] = Array(rows).fill().map(() =>
            Array(cols).fill().map(() => Math.random() * 2 - 1)
        );
        network.biases[i] = Array(rows).fill().map(() => Math.random() * 2 - 1);
        weights_cnt += rows * cols;
        biases_cnt += rows;
    }
    for (let i = 0; i < network.layerSizes.length; i++) {
        network.neurons[i] = Array(network.layerSizes[i]).fill(0);
    }
}

init();

function toward(data) {
    network.neurons[0] = data;
    for (let i = 0; i < network.layerSizes.length - 1; i++) {
        let rows = network.layerSizes[i + 1];
        let cols = network.layerSizes[i];
        for (let j = 0; j < rows; j++) {
            let sum = 0;
            for (let k = 0; k < cols; k++) {
                sum += network.neurons[i][k] * network.weights[i][j][k];
            }
            network.neurons[i + 1][j] = sigmoid(sum + network.biases[i][j]);
        }
    }
    return network.neurons[network.layerSizes.length - 1];
}

function calculate_cost() {
    let cost = 0;
    cost += toward([0, 0])[0] ** 2;
    cost += toward([1, 0])[0] ** 2;
    cost += toward([0, 1])[0] ** 2;
    cost += (toward([1, 1])[0] - 1) ** 2;
    cost /= 4;
    return cost;
}

function learn() {
    let old_cost = calculate_cost();

    let change_id = Math.floor(Math.random() * (weights_cnt + biases_cnt)) + 1;
    let cnt = 0;
    let change_amount = Math.random() * 0.1 - 0.05;
    if (change_id <= weights_cnt) {
        let a, b, c;
        first: for (let i = 0; i < network.layerSizes.length - 1; i++) {
            let rows = network.layerSizes[i + 1];
            let cols = network.layerSizes[i];
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < cols; k++) {
                    cnt++;
                    if (cnt == change_id) {
                        a = i;
                        b = j;
                        c = k;
                        break first;
                    }
                }
            }
        }
        let before_num = network.weights[a][b][c];
        if (network.weights[a][b][c] + change_amount <= 1 && network.weights[a][b][c] + change_amount >= -1) {
            network.weights[a][b][c] += change_amount;
        } else return;
        let new_cost = calculate_cost();
        if (old_cost < new_cost) {
            network.weights[a][b][c] = before_num;
        }
    } else {
        let a, b;
        cnt += weights_cnt;
        first: for (let i = 0; i < network.layerSizes.length - 1; i++) {
            let rows = network.layerSizes[i + 1];
            for (let j = 0; j < rows; j++) {
                cnt++;
                if (cnt == change_id) {
                    a = i;
                    b = j;
                    break first;
                }
            }
        }
        let before_num = network.biases[a][b];
        if (network.biases[a][b] + change_amount <= 1 && network.biases[a][b] + change_amount >= -1) {
            network.biases[a][b] += change_amount;
        } else return;
        let new_cost = calculate_cost();
        if (old_cost < new_cost) {
            network.biases[a][b] = before_num;
        }
    }
}

for (let i = 0; i < 10000000; i++) {
    learn();
    if (i % 1000000 == 0) console.log(i);
}
