const $problemInput = document.getElementById('problem-input');
const $problemButton = document.getElementById('problem-button');
const $problemOutput = document.getElementById('problem-output');
const $codeBox = document.getElementById('code-box');
const $copy = document.getElementById('copy');


$problemInput.innerHTML = '12\n5\nPalmira 2 3\nCali 10 2\nBuga 11 0\nTulua 0 3\nRiofrio 1 2';
$copy.innerHTML = 'C';
$problemButton.addEventListener('click', () => {
  const problem = $problemInput.value

  const lines = problem.split('\n');
  const squareSize = parseInt(lines[0]);
  const numberOfCities = parseInt(lines[1]);
  const cities = lines.slice(2, 2 + numberOfCities).map(city => {
    const [name, x, y] = city.split(' ')
    return { name, x: parseInt(x), y: parseInt(y) }
  });

  $codeBox.innerText = `
% Square size
int: N = ${squareSize};

% Number of cities
int: M = ${numberOfCities};

% Cities coordinates
array[1..M] of int: citiesX = [${cities.map(city => city.x).join(', ')}];
array[1..M] of int: citiesY = [${cities.map(city => city.y).join(', ')}];

% Variables
array[1..2] of var 0..N-1: concert;

array[1..M] of var int: distances;

% Constraints
constraint forall(i in 1..M) (
  (concert[1] != citiesX[i]) \\\/ (concert[2] != citiesY[i])
);

constraint forall(i in 1..M) (
  distances[i] = abs(concert[1] - citiesX[i]) + abs(concert[2] - citiesY[i])
);

% Objective
var int: max_distance = max(distances);
solve minimize max_distance;

output [
  "Max distance: \\(max_distance)\\n",
  "Concert coordinates: \\(concert)\\n"
]
`;
});
