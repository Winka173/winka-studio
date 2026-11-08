#!/bin/bash
# A contact sheet of a video: one frame every N seconds with its timestamp, tiled, so a whole clip can be reviewed in one image
# (find the moments to cut, catch a frozen screen, a death, a popup, a white flash).
# usage: contact_sheet.sh <video> <out.jpg> [seconds-between-frames=2] [columns=8] [rows=4] [label]
FF=${FFMPEG:-ffmpeg}
v=$1; out=$2; step=${3:-2}; cols=${4:-8}; rows=${5:-4}; label=${6:-}
font="C\\:/Windows/Fonts/arialbd.ttf"
"$FF" -loglevel error -y -i "$v" -vf "fps=1/$step,scale=320:-1,drawtext=fontfile='$font':text='$label %{pts\\:hms}':x=4:y=h-22:fontsize=16:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=${cols}x${rows}" -frames:v 1 "$out"
