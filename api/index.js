module.exports = async function (context, req) {
  const key = process.env.googleapikey;
  if (key) {
    context.res = {
      status: 200,
      body: { key },
      headers: {
        "Content-Type": "application/json"
      }
    };
  } else {
    context.res = {
      status: 500,
      body: { error: "API key not set" }
    };
  }
};
