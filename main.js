import GUI from 'lil-gui';
import Segment from './classes/segment';
import Vector from './classes/vector';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let gui;
let reptile;

const mouse = new Vector();

const settings = {
	length: 100,
	joints: 3,
};

// setup function runs once before animation begins
const setup = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	reptile = new Segment(mouse, settings.length, settings.joints);
	window.requestAnimationFrame(animate);
};

// animation loop runs indefinately
const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	reptile.update(ctx, mouse);

	window.requestAnimationFrame(animate);
};

/* ---------------------------
   ----- EVENT LISTENERS -----
   --------------------------- */

// run setup function
window.onload = () => {
	gui = new GUI();
	gui.add(settings, 'length', 10, 500, 10).onFinishChange(setup);
	gui.add(settings, 'joints', 0, 10, 1).onFinishChange(setup);
	setup();
};

// change canvas size as browser window resizes
canvas.addEventListener('resize', () => {
	setup();
});

// update mouse coordinates when mouse moves
canvas.addEventListener('mousemove', (e) => {
	mouse.set(e.x, e.y);
});
