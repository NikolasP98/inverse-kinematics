import Vector from './vector';

export default class Segment {
	constructor(vector, length, joints = 0, parent = null) {
		this.a = vector;

		this.b = new Vector();
		this.length = length;
		this.theta = 0;

		this.computeB();

		this.child = null;
		this.parent = parent;

		this.addTail(joints);
	}

	addTail(amt) {
		if (amt > 0) {
			this.child = new Segment(
				this.b.copy(),
				(this.length * 3) / 4,
				amt - 1,
				this
			);
		}
	}

	follow(target) {
		const dir = Vector.sub(target, this.a);
		this.theta = dir.getAngle();

		dir.setMagnitude(this.length).mult(-1);

		this.a = Vector.add(target, dir);
	}

	computeB() {
		const dx = Math.cos(this.theta) * this.length;
		const dy = Math.sin(this.theta) * this.length;
		this.b.set(this.a.x + dx, this.a.y + dy);
		return this.b;
	}

	show(ctx) {
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 2;

		ctx.beginPath();
		ctx.moveTo(this.a.x, this.a.y);
		ctx.lineTo(this.b.x, this.b.y);
		ctx.stroke();
	}

	update(ctx, vector) {
		this.computeB();
		if (this.child) {
			this.child.update(ctx, this.a);
		}
		this.follow(vector);
		this.show(ctx);
	}
}
