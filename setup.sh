#!/bin/bash
cd button 
npm install
cp button.service /etc/systemd/system
systemctl start Button
systemctl enable Button
cd ..

cd quote-site 
npm install
cp quoter.service /etc/systemd/system
systemctl start Quoter
systemctl enable Quoter
cd ..

cd speaker
npm install
cp speaker.service /etc/systemd/system
systemctl start Speaker
systemctl enable Speaker
cd ..