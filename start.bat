@echo off

:: RUN SERVER
cd .\server
start cmd /k call go run main.go

:: RUN CLIENT
cd ..\client
start cmd /k call npm start 
