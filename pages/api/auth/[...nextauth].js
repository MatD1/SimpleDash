import NextAuth from "next-auth";
import Twitch from "../../../providers/twitch";
import Auth0Provider from 'next-auth/providers/auth0'

export default NextAuth({
    providers: [
      Twitch({
        clientId: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_SECRET,
        scope: 'user:read:follows',
      }),
      Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_DOMAIN,
      })
    ],
    debug: true,
    secret: process.env.SECRET,
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.SECRET,

      },
      callbacks: {
          async signIn({ user, account, profile, email, credentials}) {
              return true
          },
          async redirect({url="/TwitchDash", baseUrl="/"}){
              return url.startsWith('/TwitchDash') ? url : baseUrl
          },
          async jwt({token, user, account, profile}) {
              if (account){
                  token.accessToken = account.access_token
                  token.sub = user.id
              }
              return token
          },
          async session({ session, token, user}) {
              session.accessToken = token.accessToken
              session.id = token.sub
              return session
          }
      },
      events: {
         signIn: ({user}) => {
             console.log(user.name)
         },
        async signOut(message) { /* on signout */ },
      }
  });


