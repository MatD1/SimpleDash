import NextAuth from "next-auth";
import Twitch from "providers/twitch";

export default NextAuth({
    providers: [
      Twitch({
        clientId: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_SECRET,
        scope: 'user:read:follows',
      }),
    ],
    debug: true,
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
        maxAge: 1000,
    },
    theme: {
        colorScheme: "dark",
      },
   /* pages: {
        signIn: '/Auth/Login'
   }, */
      callbacks: {
          async redirect({url="/Dash", baseUrl="/"}){
              return url.startsWith('/') ? url : baseUrl
          },
          async jwt({token, user, account}) {
              if (account){
                  token.accessToken = account.access_token
                  token.sub = user.id
              }
              return token
          },
          async session({ session, token}) {
              session.accessToken = token.accessToken
              session.id = token.sub
              return session
          }
      },
      events: {
         signIn: ({user}) => {
             console.log('User ', user.name, ' Has signed in')
         },
         signOut: ({user}) => {
             console.log('User', user.name, 'has signed out' )
         },
      }
  });


