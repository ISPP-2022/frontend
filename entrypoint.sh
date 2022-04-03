#!/bin/sh

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MAPBOX_API_KEY_TEMP#$MAPBOX_API_KEY#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#DATA_API_URL_TEMP#$DATA_API_URL_PUBLIC#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#AUTH_API_URL_TEMP#$AUTH_API_URL_PUBLIC#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#CHAT_SOCKET_URL_TEMP#$CHAT_SOCKET_URL_PUBLIC#g"

echo "Starting Nextjs"
exec "$@"