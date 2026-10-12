import assert from "node:assert/strict";
import test from "node:test";
import {
	authCaptain,
	authUser,
} from "../src/middlewares/authorization.middleware.js";

function createResponse() {
	return {
		statusCode: 200,
		payload: null,
		status(code) {
			this.statusCode = code;
			return this;
		},
		json(payload) {
			this.payload = payload;
			return this;
		},
	};
}

test("authUser returns 401 instead of crashing when no token is provided", async () => {
	const req = { cookies: {}, headers: {} };
	const res = createResponse();
	const next = () => {
		throw new Error("next() should not be called when token is missing");
	};

	await authUser(req, res, next);

	assert.equal(res.statusCode, 401);
	assert.deepEqual(res.payload, { message: "Unauthorized" });
});

test("authCaptain returns 401 instead of crashing when no token is provided", async () => {
	const req = { cookies: {}, headers: {} };
	const res = createResponse();
	const next = () => {
		throw new Error("next() should not be called when token is missing");
	};

	await authCaptain(req, res, next);

	assert.equal(res.statusCode, 401);
	assert.deepEqual(res.payload, { message: "Unauthorized" });
});
