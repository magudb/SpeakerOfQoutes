import cv2
import time
import os
import sys
import uuid
from poster.encode import multipart_encode
from poster.streaminghttp import register_openers
from poster.encode import MultipartParam
import urllib2

def saveFrame(frame):
    id = uuid.uuid4()   
    path = "save/{0}.jpg".format(id)
    savePath = os.path.realpath(path)  
    print 'Saving to {0}'.format(savePath)  
    cv2.imwrite(savePath ,frame)      
    return savePath 
 
cascPath = "./lbpcascade_frontalface.xml"
showVideo = True
if len(sys.argv) > 1:
    cascPath = sys.argv[1]
    showVideo = True
    
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
       video_capture.grab() 
       retval, image =  video_capture.retrieve()
       filePath = saveFrame(image)
       cv2.waitKey(5)       
       time.sleep(5)     
     
    if showVideo == True:      
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)          
        # Display the resulting frame
        cv2.imshow('Video', frame)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()