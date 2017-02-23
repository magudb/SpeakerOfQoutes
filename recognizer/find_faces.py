import cv2
import time
import os
import sys
import uuid
import redis
from poster.encode import multipart_encode
from poster.streaminghttp import register_openers
from poster.encode import MultipartParam
import urllib2

cascPath = "./lbpcascade_frontalface.xml"
redisClient = redis.StrictRedis(host='localhost', port=6379, db=0)    
faceCascade = cv2.CascadeClassifier(cascPath)

video_capture = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )
    
    facesInFrame = len(faces)    
    if facesInFrame > 1:   
       print 'Faces in frame {0}'.format(facesInFrame)  
       r.publish('facer', '{"face":"true"}')
       cv2.waitKey(5)       
       time.sleep(5)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()