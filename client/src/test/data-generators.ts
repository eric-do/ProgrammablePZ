import faker from 'faker';

export const generateFriend = () => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName()
});

export const generateListOfFriends = (n = 10) => {
  const friends = [];
  for (let i = 0; i < n; i++) {
    friends.push(generateFriend());
  }
  return friends;
}

export const generateFriendshipMetadata = () => ({
  friend_count: faker.datatype.number({min: 0, max: 1000}),
  follower_count: faker.datatype.number({min: 0, max: 1000})
})