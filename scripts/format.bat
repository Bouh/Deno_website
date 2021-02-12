@ECHO OFF
call deno fmt "../"
call deno lint --unstable "../"
IF ERRORLEVEL 1 GOTO HANDLE-ERROR
TIMEOUT /T 3
EXIT

:HANDLE-ERROR
pause>nul