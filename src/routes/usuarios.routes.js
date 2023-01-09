/* It is also possible to define which attributes can be set in the create method. This can be especially useful if you create database entries based on a form which can be filled by a user. Using that would, for example, allow you to restrict the User model to set only an username but not an admin flag */


const user = await User.create({
    username: 'alice123',
    isAdmin: true
  }, { fields: ['username'] });
  // let's assume the default of isAdmin is false
  console.log(user.username); // 'alice123'
  console.log(user.isAdmin); // false