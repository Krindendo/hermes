import auth from "~/utils/auth";

export default eventHandler({ onRequest: [auth], async handler(event) {} });
