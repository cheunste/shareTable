@echo off
taskkill /IM node.exe -F
type .\exitcmd.txt | .\redis\redis-cli -x