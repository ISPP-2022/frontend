#!/bin/sh
echo "Check that we have NEXT_PUBLIC_MAPBOX_API_KEY vars"
test -n "$NEXT_PUBLIC_MAPBOX_API_KEY"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#MAPBOX_API_KEY#$NEXT_PUBLIC_MAPBOX_API_KEY#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#DATA_API_URL#$DATA_API_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#AUTH_API_URL#$AUTH_API_URL#g"

echo "Starting Nextjs"
exec "$@"