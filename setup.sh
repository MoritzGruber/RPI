#!/bin/bash

sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo ln -s /usr/bin/nodejs /usr/bin/node
cd RPI
npm install
touch testfile.html
node server.js                         
