const fs = require("fs");
const os = require("os");

const STORAGE_PATH = `${os.homedir()}/.kingofpong/`;
const SETTINGS_PATH = `${STORAGE_PATH}/settings`;

class Settings {
  initialize() {
    if (!fs.existsSync(STORAGE_PATH)) {
      fs.mkdirSync(STORAGE_PATH);
    }

    if (!fs.existsSync(SETTINGS_PATH)) {
      fs.writeFileSync(SETTINGS_PATH, JSON.stringify({}));
    }
  }

  get(key) {
    const settings = this.readSettings();

    if (settings.hasOwnProperty(key)) {
      return settings[key];
    } else {
      return null;
    }
  }

  getAll() {
    return this.readSettings();
  }

  set(key, value) {
    const settings = this.readSettings();

    settings[key] = value;

    this.writeSettings(settings);
  }

  readSettings() {
    const contents = fs.readFileSync(SETTINGS_PATH);

    return JSON.parse(contents);
  }

  writeSettings(settings) {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings));
  }
}

module.exports = Settings;
