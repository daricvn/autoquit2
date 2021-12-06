if not exist %2 mkdir %2
if not "%3" == "Debug-Win64" AND not "%3" == "Release-Win64" exit
xcopy %1 %2 /S /Y