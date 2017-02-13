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

# cp redis.service /etc/systemd/system
# systemctl daemon-reload
# systemctl start redis.service
# systemctl enable redis.service