// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import


module.exports = {
  name: 'murojaah-mobile',
  version: '0.0.1',
  extra: {
    apiUrl: process.env.API_URL
  },
};