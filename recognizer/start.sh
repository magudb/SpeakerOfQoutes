#!/bin/bash

source ~/.profile
source ~/.bashrc
source /usr/local/bin/virtualenvwrapper.sh
workon cv
python find_faces.py