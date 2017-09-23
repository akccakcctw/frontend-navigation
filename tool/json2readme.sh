#!/bin/bash

jsonData=$(cat js/data.json);
# get category length in js/data.json
jsonLen=$(echo $jsonData | jq 'keys | length')

# colorful echo
revertColor='\033[7m'
noColor='\033[0m'

echo '# [Front-end Navigation](https://akccakcctw.github.io/frontend-navigation/)' > README.md
echo '' >> README.md

for (( i=0; i<$jsonLen; i++ )); do

	echo -ne "${revertColor}[ $i/$jsonLen ]${noColor}"\\r # show progress

  category=$(echo $jsonData | jq ".[$i].type" -r) # -r: --row-output(output without quotation marks)
  name=$(echo $jsonData | jq ".[$i].name" -r) # category in Chinese
  data=$(echo $jsonData | jq ".[$i].data")
  dataLen=$(echo $jsonData | jq ".[$i].data | length")
  echo \#\# [$name\($category\)]\(https://akccakcctw.github.io/frontend-navigation/#$category\) >> README.md
  for (( j=0; j<$dataLen; j++ )); do
    title=$(echo $data | jq ".[$j][0]" -r)
    url=$(echo $data | jq ".[$j][1]" -r)
    info=$(echo $data | jq ".[$j][2]" -r)
    echo - [$title]\($url\) - $info >> README.md
  done
  echo '' >> README.md

done
# output example: ## [原型設計(prototype)](https://akccakcctw.github.io/frontend-navigation/#prototype)

echo -e "${revertColor}[ Complete! ]${noColor}"
exit 0;
