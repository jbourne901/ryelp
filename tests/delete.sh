#!/bin/bash

post_data() {
   cat <<EEE
{ "id": 15 }
EEE
}

echo "data=$(post_data)"


curl --header "Content-Type: application/json" --request DELETE --data-binary "$(post_data)"  http://192.168.2.242:3005/api/v1/restaurants
