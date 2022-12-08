export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type AppUser = User & {
  email: string;
  token: string;
};

export type AppUserData = {
  email: string;
  password: string;
};
