#!/bin/bash
echo "Button Start"
cd button 
#npm install
cp button.service /etc/systemd/system
systemctl daemon-reload
systemctl start button.service
systemctl enable button.service
cd ..
echo "Button stop"

echo "Quote Start"
cd quote-site 
#npm install
cp quoter.service /etc/systemd/system
systemctl daemon-reload
systemctl start quoter.service
systemctl enable quoter.service
cd ..
echo "Quote stop"

echo "Speaker Start"
cd speaker
#npm install
cp speaker.service /etc/systemd/system
systemctl daemon-reload
systemctl start speaker.service
systemctl enable speaker.service
cd ..
echo "Speaker"

echo "Facer Start"
cd facer
#npm install
cp facer.service /etc/systemd/system
systemctl daemon-reload
systemctl start facer.service
systemctl enable facer.service
cd ..
echo "Facer stop"

echo "recoger Start"
cd recognizer
#npm install
cp recognizer.service /etc/systemd/system
systemctl daemon-reload
systemctl start recognizer.service
systemctl enable recognizer.service
cd ..
echo "Recoger stop"

# cp redis.service /etc/systemd/system
# systemctl daemon-reload
# systemctl start redis.service
# systemctl enable redis.service