const express = require('express');
const supertest = require('supertest');
const { app, server } = require('../index.js'); 
const mongoose = require('mongoose');
const { User } = require('../index');

require('dotenv').config()

const request = supertest(app);

describe('Express App', () => {
  
  let userId;

  beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://UIPersonalization:${process.env.MONGOOSE_PASSWORD}@cluster0.absh9oa.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /register should create a new user', async () => {
    const response = await request.post('/register').send({
      username: 'test',
      email: 'color@gmail.com',
      password: process.env.REGISTER_PASSWORD1
    });

    userId = response.body._id; 
    expect(response.status).toBe(200);
  }, 10000); 

  it('POST /register should handle registration if email already exists', async () => {
    const response = await request.post('/register').send({
      username: 'test',
      email: 'color@gmail.com',
      password: process.env.REGISTER_PASSWORD1,
    });
    console.log("This is the response".response)
    expect(response.status).toBe(300);
    expect(response.body.msg).toBe('Email Already Exist!');
  }, 10000); 

  it('POST /login should log in a registered user with correct credentials', async () => {
    const response = await request.post('/login').send({
      email: 'color@gmail.com',
      password: process.env.REGISTER_PASSWORD2,
    });
    expect(response.status).toBe(400);
    
  }, 10000); // Set a timeout of 10 seconds

  it('POST /login should handle wrong password', async () => {
    const response = await request.post('/login').send({
      email: 'color@gmail.com',
      password: process.env.WRONG_PASSWORD,
    });
    expect(response.status).toBe(404); // Expect a 404 status for wrong password
    expect(response.body.msg).toBe('Wrong Password');
  }, 10000); // Set a timeout of 10 seconds

  it('POST /colors should update user colors', async () => {
    const colorData = {
      buttonbackgroundColor: 'newColor',
      textColor: 'newColor',
      headerBackgroundColor: 'newColor',
      footerBackgroundColor: 'newColor',
      radioButtonColor: 'newColor',
      dropDownButtonColor: 'newColor',
      themeColor1: 'newColor',
      themeColor2: 'newColor',
      themeColor3: 'newColor',
      
    };

    const response = await request.post('/colors').send(colorData);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Update successful');
  }, 10000); // Set a timeout of 10 seconds


  afterAll(async () => {
  
    if (userId) {
      await User.deleteOne({ _id: userId });
    }
    server.close();
  });
});
