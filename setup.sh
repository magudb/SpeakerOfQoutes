#!/bin/bash
cd button 
npm install
cp button.service /etc/systemd/system
systemctl daemon-reload
systemctl start button.service
systemctl enable button.service
cd ..

cd quote-site 
npm install
cp quoter.service /etc/systemd/system
systemctl daemon-reload
systemctl start quoter.service
systemctl enable quoter.service
cd ..

cd speaker
npm install
cp speaker.service /etc/systemd/system
systemctl daemon-reload
systemctl start speaker.service
systemctl enable speaker.service
cd ..

cp redis.service /etc/systemd/system
systemctl daemon-reload
systemctl start redis.service
systemctl enable redis.service