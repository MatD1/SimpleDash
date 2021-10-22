"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Twitch;

function Twitch(options) {
  return {
    wellKnown: "https://id.twitch.tv/oauth2/.well-known/openid-configuration",
    id: "twitch",
    name: "Twitch",
    type: "oauth",
    authorization: {
      params:  {
        scope: "openid user:read:email channel:read:stream_key user:read:follows",
        params: "broadcaster_id",
        claims: JSON.stringify({
          id_token: {
            email: null,
            picture: null,
            preferred_username: null,
          }
        })
      }
    },
    idToken: true,

    profile(profile) {
      return {
        id: profile.sub,
        name: profile.preferred_username,
        email: profile.email,
        image: profile.picture
      };
    },

    options
  };
}