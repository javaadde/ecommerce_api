// import mongoose from "mongoose";
import { users } from "../models/users.js";
import bcrypt from "bcrypt";

export async function insertDoc(form) {
  const doc = form;
  console.log(doc);

  const hashedpass = await bcrypt.hash(doc.password, 5);
  console.log(hashedpass);

  try {
    await users.insertOne({
      _id: doc.username,
      password: hashedpass,
      email: doc.email,
    });

    return {
      message: "signup compleated succesfully",
    };
  } catch (err) {
    if (err.code === 11000) {
      return {
        message: "username is allready exists",
      };
    }
    console.log(err);
  }
}

export async function checkPassword(doc) {
  try {
    const user = await users.findOne({ _id: doc.username });
    console.log(user);

    const currect = await bcrypt.compare(doc.password, user.password);
    return currect;
  } catch (error) {
    console.log(error);
  }
}

export async function findManyUsers() {
  const manyUsers = await users.find();
  return manyUsers;
}

export async function findOneUser(user_id) {
  const user = await users.findOne({ _id: user_id });
  return user;
}

export async function disableUser(user_id) {
  const dsbl = await users.updateOne(
    { _id: user_id },
    {
      $set: {
        active: false,
      },
    }
  );

  return dsbl;
}

export async function enableUser(user_id) {
  const enbl = await users.updateOne(
    { _id: user_id },
    {
      $set: {
        active: true,
      },
    }
  );

  return enbl;
}
