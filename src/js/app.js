import 'style!normalize.css';
import 'style!../css/style.scss';


// Draw 'imperfect cirle'
// TODO swap this out for an interactive piece
let split = document.createElement('img');
split.src = require('../media/split.svg');
document.getElementById('graphic').appendChild(split);


// swap mailto link to provide full public key in body
// swap out 'Human' text with address on hover