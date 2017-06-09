#!/bin/bash

# get category length in js/data.json
jsonLen=$(cat js/data.json | jq 'keys | length')

# colorful echo
revertColor='\033[7m'
noColor='\033[0m'

echo '# [Front-end Navigation](https://akccakcctw.github.io/frontend-navigation/)' > README.md
echo '' >> README.md

for (( i=0; i<$jsonLen; i++ )); do

	echo -ne "${revertColor}[ $i/$jsonLen ]${noColor}"\\r # show progress

	key=$(cat js/data.json | jq "keys_unsorted[$i]") # category with quote
	keyOutput=$(cat js/data.json | jq "keys_unsorted[$i]" -r) # category without quote
	value=$(cat js/data.json | jq ".$key[0]" -r) # category in Chinese

	echo \#\# [$value\($keyOutput\)]\(https://akccakcctw.github.io/frontend-navigation/#$keyOutput\) >> README.md
	echo '' >> README.md

done

echo -e "${revertColor}[ Complete! ]${noColor}"
