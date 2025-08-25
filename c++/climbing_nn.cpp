#include <iostream>
#include <algorithm>
#include <string>
#include <vector>
#include <random>
using namespace std;
template<typename T> using vc = vector<T>;

struct network {
	vc<int> layerSizes;
	vc<vc<vc<double>>> weights;
	vc<vc<double>> biases;
	vc<vc<double>> neurons;
};

network nn;

double sigmoid(double x) {
	return 1 / (1 + exp(-x));
}

double abs_rand(double range) {
	return (rand() / (double)RAND_MAX) * range * 2 - range;
}

void init() {
	//for (int i = 0; i < nn.layerSizes.size() - 1; i++) {
	//	int rows = nn.layerSizes[i + 1];
	//	int cols = nn.layerSizes[i];

	//	for (int j = 0; j < rows; j++) {
	//		vc<double> weight(cols);
	//		for (double& w : weight);
	//	}
	//}
	//for (let i = 0; i < nn.layerSizes.length; i++) {
	//	nn.neurons[i] = Array(n.layerSizes[i]).fill(0);
	//}
}

int main() {
	srand(static_cast<unsigned int>(time(0)));
	cout << abs_rand(0.1) << endl;
	cout << abs_rand(0.1) << endl;
	cout << abs_rand(0.1) << endl;
	cout << abs_rand(0.1) << endl;
	cout << abs_rand(0.1) << endl;
}
