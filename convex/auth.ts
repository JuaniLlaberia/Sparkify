import GitHub from '@auth/core/providers/github';
import Google, { GoogleProfile } from '@auth/core/providers/google';
import { convexAuth } from '@convex-dev/auth/server';

const DEFAULT_TOKENS = 50000;

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          fullName: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          tokens: DEFAULT_TOKENS,
        };
      },
    }),
    Google({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          fullName:
            profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          tokens: DEFAULT_TOKENS,
        };
      },
    }),
  ],
});
