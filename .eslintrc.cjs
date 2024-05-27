module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
  rules: {
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 4
      },      
      "multiline": {
        "max": 1
      }
    }]
  }
};