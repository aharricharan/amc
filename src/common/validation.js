import { validate } from "jsonschema";

const validation = (state) => {
	const SCHEMA = {
		type: "object",
		properties: {
			firstName: {type: "string", "minLength": 1, displayName: "First name"},
			lastName: {type: "string", "minLength": 3, displayName: "Last name"},
			email: {type: "string", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", displayName: "Email"},
			address: {type: "string", "minLength": 5, displayName: "Address"}
		},
		required: ["firstName","lastName","email","address"]
	}
	return validate(state, SCHEMA);
}

export default validation;