export const password = 'fb07d942a7d5d79b689b10eb3dbb412464d322a7e8e7833436ba874327464822';

export const Session = {
  cookieName: 'printer',
  password,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
