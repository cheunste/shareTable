@echo off
start ./redis/redis-server.exe redis.conf
node ./server.js