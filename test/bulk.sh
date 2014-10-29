#!/bin/bash
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rm -f "$dir/../skins/"*.png || exit 1
for uuid in `cat "$dir/uuids.txt"`; do
  uuid=`echo "$uuid" | tr -d '\r'`
  size=$(( ((RANDOM<<15)|RANDOM) % 514 - 1 )) # random number from -1 to 513
  curl -sS -o /dev/null -w "%{url_effective} %{http_code} %{time_total}s\\n" "http://127.0.0.1:3000/avatars/$uuid/$size"
done
