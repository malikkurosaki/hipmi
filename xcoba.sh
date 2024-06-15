#!/bin/bash
ffmpeg -f avfoundation \
-i "1:0" \
-s 1280x720 \
-framerate 30 \
-c:v libx264 \
-preset ultrafast \
-tune zerolatency \
-b:v 3000k \
-c:a aac \
-b:a 192k \
-vf "format=uyvy422" \
-f flv "rtmp://192.168.1.243:1935/live/bagas" \
-probesize 10M