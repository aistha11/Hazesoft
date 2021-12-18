export default function deletePasswordFromResponse(users) {
  const usersWithoutPassword = users.map((user) => {
    delete user.password;
    return user;
  });

  return usersWithoutPassword;
}
