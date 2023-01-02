// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import


module.exports = {
  name: 'Murojaah',
  version: '0.1.0',
  extra: {
    apiUrl: process.env.API_URL,
    eas: {
      projectId: 'com.caizen.murojaah'
    }
  },
};