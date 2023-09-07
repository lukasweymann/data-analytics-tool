#!/bin/bash
JOBS=$1
langcode=$2
inputfile=$3
outputfile=$4
column=$5

cat $inputfile | cut -f $column | /work/preprocess/build/bin/cache -k 1 parallel -k -j $JOBS --pipe ./scripts/par-fastspell.sh $langcode > $outputfile


