#!/usr/bin/env bash

lines=`grep -e \"gmail-inbox[a-zA-Z0-9.-]*\" ./packages/ -or --include=package.json --exclude-dir=node_modules`

for l in $lines
do
    path=`echo $l | sed 's/^\.\(.*\\/\)package\.json:.*/\1/'`
    module=`echo $l |sed 's/.*:"\(gmail-inbox[a-zA-Z0-9.-]*\)"$/\1/'`

    rm -rf ./node_modules/$module
    ln -sf `pwd`$path `pwd`/node_modules/$module
    echo "`pwd`$path -> `pwd`/node_modules/$module"
done
