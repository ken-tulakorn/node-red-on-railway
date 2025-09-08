/**
 * Minimal Node-RED settings for Railway (no Docker, no local Node needed).
 * Authentication is enabled ONLY if ADMIN_USERNAME and ADMIN_PASSWORD_HASH are set.
 * ADMIN_PASSWORD_HASH must be a bcrypt hash (not plain text).
 */
let users = [];
if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH) {
  users = [{
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD_HASH, // bcrypt hash
    permissions: "*"
  }];
}

module.exports = {
  uiPort: process.env.PORT || 3000,
  userDir: "/data",                 // flows, credentials, and palette installs
  flowFile: "flows.json",
  flowFilePretty: true,
  editorTheme: { projects: { enabled: false } },
  ...(users.length ? { adminAuth: { type: "credentials", users } } : {}),
  logging: { console: { level: "info", metrics: false, audit: false } },
  httpNodeRoot: "/",
  functionGlobalContext: {}
};
